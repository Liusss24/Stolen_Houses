import type {
  LandingTestimonial,
  LandingTexts,
} from "@/i18n/es/landing";

import styles from "./landing-testimonial-card.module.css";

export type LandingTestimonialCardProps = {
  testimonial: LandingTestimonial;
  indexPrefix: LandingTexts["catalog"]["cardLabels"]["indexPrefix"];
};

export function LandingTestimonialCard({
  testimonial,
  indexPrefix,
}: LandingTestimonialCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.headRow}>
        <span className={styles.indexLine}>
          {indexPrefix} {testimonial.index}
        </span>
        <span className={styles.quoteMark} aria-hidden="true">
          &ldquo;
        </span>
      </div>

      <blockquote className={styles.quote}>
        &laquo;{testimonial.quote}&raquo;
      </blockquote>

      <div>
        <div className={styles.author}>{testimonial.author}</div>
        <div className={styles.role}>· {testimonial.role}</div>
      </div>
    </article>
  );
}
