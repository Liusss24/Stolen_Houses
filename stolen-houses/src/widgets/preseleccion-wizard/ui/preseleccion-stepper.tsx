import type { CSSProperties } from "react";

import type { PreseleccionStep } from "@/features/preseleccion/model/preseleccion.types";
import type { PreseleccionTexts } from "@/i18n/es/preseleccion";

import styles from "./preseleccion-stepper.module.css";

export type PreseleccionStepDescriptor = {
  key: PreseleccionStep;
  indexLabel: string;
  shortLabel: string;
};

export type PreseleccionStepperProps = {
  steps: ReadonlyArray<PreseleccionStepDescriptor>;
  activeStep: PreseleccionStep;
  texts: PreseleccionTexts["stepper"];
};

export function PreseleccionStepper({
  steps,
  activeStep,
  texts,
}: PreseleccionStepperProps) {
  const activeIndex = steps.findIndex((step) => step.key === activeStep);
  const safeIndex = activeIndex >= 0 ? activeIndex : 0;
  const trackStyle = { "--steps": steps.length } as CSSProperties;

  return (
    <div className={styles.stepper}>
      <span className={styles.progress}>
        {texts.progressLabel(String(safeIndex + 1), String(steps.length))}
      </span>

      <ol className={styles.track} style={trackStyle}>
        {steps.map((step, index) => {
          const isActive = step.key === activeStep;
          const isComplete = index < safeIndex;
          const className = isActive
            ? `${styles.step} ${styles.stepActive}`
            : isComplete
              ? `${styles.step} ${styles.stepComplete}`
              : styles.step;

          return (
            <li key={step.key} className={className}>
              <span className={styles.stepIndex}>{step.indexLabel}</span>
              <span className={styles.stepLabel}>{step.shortLabel}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
