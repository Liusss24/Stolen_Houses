import type { Metadata } from "next";
import Link from "next/link";

import { getLocale } from "@/shared/lib/get-locale";
import { PRESELECCION_TEXTS as ES_TEXTS } from "@/i18n/es/preseleccion";
import { PRESELECCION_TEXTS as EN_TEXTS } from "@/i18n/en/preseleccion";
import { PreseleccionWizard } from "@/widgets/preseleccion-wizard";

import styles from "./page.module.css";

const CATALOG_HREF = "/propiedades";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const texts = (locale === "en" ? EN_TEXTS : ES_TEXTS) as typeof ES_TEXTS;
  return {
    title: texts.metadata.title,
    description: texts.metadata.description,
  };
}

export default async function PreseleccionPage() {
  const locale = await getLocale();
  const texts = (locale === "en" ? EN_TEXTS : ES_TEXTS) as typeof ES_TEXTS;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>← Inicio</Link>
        <header className={styles.header}>
          <div className={styles.dividerRow}>
            <span className={styles.divider} aria-hidden="true" />
            <span className={styles.eyebrow}>{texts.header.eyebrow}</span>
            <span className={styles.divider} aria-hidden="true" />
          </div>
          <h1 className={styles.title}>{texts.header.title}</h1>
          <p className={styles.description}>{texts.header.description}</p>
        </header>

        <PreseleccionWizard catalogHref={CATALOG_HREF} locale={locale} />
      </div>
    </main>
  );
}
