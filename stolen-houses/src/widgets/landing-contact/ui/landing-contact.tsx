import type { LandingTexts } from "@/i18n/es/landing";

import { LandingContactForm } from "./landing-contact-form";
import styles from "./landing-contact.module.css";

export type LandingContactProps = {
  contact: LandingTexts["contact"];
};

export function LandingContact({ contact }: LandingContactProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div>
          <p className={styles.kicker}>— {contact.kicker} —</p>
          <h2 className={styles.title}>{contact.title}</h2>
          <p className={styles.description}>{contact.description}</p>

          <dl className={styles.infoList}>
            {contact.info.map((item) => (
              <div key={item.label} className={styles.infoItem}>
                <dt className={styles.infoLabel}>{item.label}</dt>
                <dd className={styles.infoValue}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <LandingContactForm form={contact.form} />
      </div>
    </section>
  );
}
