import type { Metadata } from "next";

import { AUTH_TEXTS } from "@/i18n/es/auth";
import styles from "@/app/main-menu.module.css";
import { LoginForm } from "@/widgets/login-form/ui/login-form";

export const metadata: Metadata = {
  title: AUTH_TEXTS.login.metadataTitle,
  description: AUTH_TEXTS.login.metadataDescription,
};

export default function LoginPage() {
  const texts = AUTH_TEXTS.login;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.badge}>{texts.header.badge}</span>
          <h1 className={styles.title}>{texts.header.title}</h1>
        </header>

        <section className={styles.panel} aria-label={texts.header.title}>
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
