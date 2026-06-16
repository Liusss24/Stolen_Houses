import Link from "next/link";

import { getLocale } from "@/shared/lib/get-locale";
import { PROPERTY_DETAIL_TEXTS as ES_TEXTS } from "@/i18n/es/property-detail";
import { PROPERTY_DETAIL_TEXTS as EN_TEXTS } from "@/i18n/en/property-detail";

import styles from "./not-found.module.css";

const CATALOG_HREF = "/propiedades";

export default async function PropertyNotFound() {
  const locale = await getLocale();
  const texts = ((locale === "en" ? EN_TEXTS : ES_TEXTS) as typeof ES_TEXTS).notFound;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.dividerRow}>
          <span className={styles.eyebrow}>{texts.eyebrow}</span>
          <span className={styles.divider} aria-hidden="true" />
        </div>

        <h1 className={styles.title}>{texts.title}</h1>
        <p className={styles.description}>{texts.description}</p>

        <Link href={CATALOG_HREF} className={styles.action}>
          <span aria-hidden="true">{"<"}</span>
          {texts.action}
        </Link>
      </div>
    </main>
  );
}
