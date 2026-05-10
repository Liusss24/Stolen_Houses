import type { LandingTexts } from "@/i18n/es/landing";

import { LandingTestimonialCard } from "./landing-testimonial-card";
import styles from "./landing-testimonials.module.css";

export type LandingTestimonialsProps = {
  testimonials: LandingTexts["testimonials"];
  indexPrefix: LandingTexts["catalog"]["cardLabels"]["indexPrefix"];
};

export function LandingTestimonials({
  testimonials,
  indexPrefix,
}: LandingTestimonialsProps) {
  return (
    <section className={styles.section} id="nosotros">
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.kicker}>— {testimonials.kicker} —</p>
          <h2 className={styles.title}>{testimonials.title}</h2>
        </div>

        <div className={styles.grid}>
          {testimonials.items.map((testimonial) => (
            <LandingTestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              indexPrefix={indexPrefix}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
