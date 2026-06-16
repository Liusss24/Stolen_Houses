import Link from "next/link";

import styles from "./admin-top-bar.module.css";

type AdminTopBarProps = {
  backHref?: string;
  backLabel?: string;
};

export function AdminTopBar({ backHref, backLabel = "← Panel" }: AdminTopBarProps) {
  return (
    <div className={styles.bar}>
      {backHref ? (
        <Link href={backHref} className={styles.backLink}>
          {backLabel}
        </Link>
      ) : (
        <span />
      )}
      <form action="/api/auth/logout" method="POST">
        <button type="submit" className={styles.logoutButton}>
          Cerrar sesión
        </button>
      </form>
    </div>
  );
}
