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
import { AUTH_EXAMPLE_CREDENTIALS } from "@/features/auth/model/auth.credentials";
import type { AuthTexts } from "@/i18n/es/auth";

const LOGIN_ENDPOINT = "/api/auth/login";

type ApiErrorResponse = {
  message?: string;
};

type LoginFormTexts = AuthTexts["login"];

type UseLoginFormReturn = {
  role: AuthRole;
  email: string;
  password: string;
  error: string | null;
  isSubmitting: boolean;
  credentialHint: string;
  handleRoleChange: (nextRole: AuthRole) => void;
  handleEmailChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

/**
 * useLoginForm
 * Needs: localized login texts (`AUTH_TEXTS.login`) for hint + error messages.
 * Does: holds role/email/password state seeded from example credentials, posts
 *       them to the login endpoint, and routes to the role-specific home page
 *       on success.
 * Returns: input state, derived credential hint, change/submit handlers and
 *          submission status flags consumed by the LoginForm widget.
 */
export function useLoginForm(texts: LoginFormTexts): UseLoginFormReturn {
  const router = useRouter();

  const [role, setRole] = useState<AuthRole>(AUTH_ROLES.client);
  const [email, setEmail] = useState(
    AUTH_EXAMPLE_CREDENTIALS[AUTH_ROLES.client].email,
  );
  const [password, setPassword] = useState(
    AUTH_EXAMPLE_CREDENTIALS[AUTH_ROLES.client].password,
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const credentialHint = useMemo(() => {
    return role === AUTH_ROLES.admin
      ? texts.form.credentials.admin
      : texts.form.credentials.client;
  }, [role, texts.form.credentials.admin, texts.form.credentials.client]);

  const handleRoleChange = useCallback((nextRole: AuthRole) => {
    setRole(nextRole);
    setEmail(AUTH_EXAMPLE_CREDENTIALS[nextRole].email);
    setPassword(AUTH_EXAMPLE_CREDENTIALS[nextRole].password);
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      setError(null);

      try {
        const response = await fetch(LOGIN_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ role, email, password }),
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

  return {
    role,
    email,
    password,
    error,
    isSubmitting,
    credentialHint,
    handleRoleChange,
    handleEmailChange: setEmail,
    handlePasswordChange: setPassword,
    handleSubmit,
  };
}
