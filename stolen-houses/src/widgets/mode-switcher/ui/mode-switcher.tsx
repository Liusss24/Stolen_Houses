"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MAIN_MENU_TEXTS } from "@/i18n/es/main-menu";
import styles from "./mode-switcher.module.css";

export function ModeSwitcher() {
  const pathname = usePathname() ?? "/";
  if (pathname.startsWith("/login")) {
    return null;
  }

  const isAdmin = pathname.startsWith("/dashboard");

  const texts = MAIN_MENU_TEXTS.switcher;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link
          href={texts.client.href}
          className={`${styles.button} ${!isAdmin ? styles.active : ""}`}
          aria-current={!isAdmin ? "page" : undefined}
        >
          {texts.client.label}
        </Link>

        <Link
          href={texts.admin.href}
          className={`${styles.button} ${isAdmin ? styles.active : ""}`}
          aria-current={isAdmin ? "page" : undefined}
        >
          {texts.admin.label}
        </Link>
      </div>
    </header>
  );
}
