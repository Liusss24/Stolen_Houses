"use client";

import { useCallback, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

import {
  AUTH_ADMIN_PREFIX,
  AUTH_CLIENT_HOME_PATH,
  AUTH_ROLES,
  type AuthRole,
} from "@/features/auth/model/auth.constants";
import { AUTH_TEXTS } from "@/i18n/es/auth";

import styles from "./login-form.module.css";

type ApiErrorResponse = {
  message?: string;
};

const EXAMPLE_CREDENTIALS: Record<AuthRole, { email: string; password: string }> = {
  [AUTH_ROLES.admin]: {
    email: "admin@admin.com",
    password: "1234",
  },
  [AUTH_ROLES.client]: {
    email: "cliente@cliente.com",
    password: "1234",
  },
};

export function LoginForm() {
  const router = useRouter();
  const texts = AUTH_TEXTS.login;

  const [role, setRole] = useState<AuthRole>(AUTH_ROLES.client);
  const [email, setEmail] = useState(EXAMPLE_CREDENTIALS[AUTH_ROLES.client].email);
  const [password, setPassword] = useState(
    EXAMPLE_CREDENTIALS[AUTH_ROLES.client].password,
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const credentialHint = useMemo(() => {
    return role === AUTH_ROLES.admin
      ? texts.form.credentials.admin
      : texts.form.credentials.client;
  }, [role, texts.form.credentials.admin, texts.form.credentials.client]);

  const handleRoleChange = useCallback(
    (nextRole: AuthRole) => {
      setRole(nextRole);
      setEmail(EXAMPLE_CREDENTIALS[nextRole].email);
      setPassword(EXAMPLE_CREDENTIALS[nextRole].password);
      setError(null);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      setError(null);

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            role,
            email,
            password,
          }),
        });

        if (!response.ok) {
          const data = (await response
            .json()
            .catch(() => null)) as ApiErrorResponse | null;

          setError(
            data?.message ??
              (response.status === 400
                ? texts.errors.invalidPayload
                : texts.errors.invalidCredentials),
          );
          return;
        }

        const destination =
          role === AUTH_ROLES.admin ? AUTH_ADMIN_PREFIX : AUTH_CLIENT_HOME_PATH;

        router.replace(destination);
        router.refresh();
      } catch {
        setError(texts.errors.unknown);
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, password, role, router, texts.errors],
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{texts.form.roleLabel}</legend>

        <div className={styles.roleGrid}>
          <label
            className={`${styles.roleOption} ${
              role === AUTH_ROLES.client ? styles.roleOptionActive : ""
            }`}
          >
            <input
              className={styles.roleInput}
              type="radio"
              name="role"
              value={AUTH_ROLES.client}
              checked={role === AUTH_ROLES.client}
              onChange={() => handleRoleChange(AUTH_ROLES.client)}
            />
            {texts.form.roles.client}
          </label>

          <label
            className={`${styles.roleOption} ${
              role === AUTH_ROLES.admin ? styles.roleOptionActive : ""
            }`}
          >
            <input
              className={styles.roleInput}
              type="radio"
              name="role"
              value={AUTH_ROLES.admin}
              checked={role === AUTH_ROLES.admin}
              onChange={() => handleRoleChange(AUTH_ROLES.admin)}
            />
            {texts.form.roles.admin}
          </label>
        </div>

        <p className={styles.hint}>
          <span className={styles.hintLabel}>
            {texts.form.credentialHintPrefix}:
          </span>{" "}
          {credentialHint}
        </p>
      </fieldset>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="email">
          {texts.form.email.label}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={texts.form.email.placeholder}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="password">
          {texts.form.password.label}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={texts.form.password.placeholder}
          className={styles.input}
          required
        />
      </div>

      {error ? (
        <div role="alert" className={styles.error}>
          {error}
        </div>
      ) : null}

      <div className={styles.actions}>
        <button type="submit" disabled={isSubmitting} className={styles.button}>
          {isSubmitting ? texts.form.submitting : texts.form.submit}
        </button>
      </div>
    </form>
  );
}
