"use client";

import { usePreseleccionWizard } from "@/features/preseleccion/hooks/use-preseleccion-wizard";
import { PRESELECCION_STEP_ORDER } from "@/features/preseleccion/model/preseleccion.constants";
import { PRESELECCION_STEPS } from "@/features/preseleccion/model/preseleccion.types";
import type { PreseleccionTexts } from "@/i18n/es/preseleccion";
import { PRESELECCION_TEXTS as ES_TEXTS } from "@/i18n/es/preseleccion";
import { PRESELECCION_TEXTS as EN_TEXTS } from "@/i18n/en/preseleccion";
import type { Locale } from "@/shared/constants/locale";

import {
  PreseleccionStepper,
  type PreseleccionStepDescriptor,
} from "./preseleccion-stepper";
import { PreseleccionStepForm } from "./preseleccion-step-form";
import { PreseleccionResults } from "./preseleccion-results";
import styles from "./preseleccion-wizard.module.css";

export type PreseleccionWizardProps = {
  catalogHref: string;
  locale?: Locale;
};

function buildStepDescriptors(
  texts: PreseleccionTexts,
): ReadonlyArray<PreseleccionStepDescriptor> {
  return PRESELECCION_STEP_ORDER.map((key) => ({
    key,
    indexLabel: texts.steps[key].indexLabel,
    shortLabel: texts.steps[key].eyebrow,
  }));
}

export function PreseleccionWizard({
  catalogHref,
  locale = "es",
}: PreseleccionWizardProps) {
  const texts = (locale === "en" ? EN_TEXTS : ES_TEXTS) as typeof ES_TEXTS;
  const {
    step,
    form,
    isLoading,
    feedback,
    result,
    isFirstStep,
    isLastInputStep,
    isResultsStep,
    handleChange,
    goNext,
    goBack,
    goToStep,
    reset,
  } = usePreseleccionWizard({ loadError: texts.results.list.emptySummary });

  const stepDescriptors = buildStepDescriptors(texts);

  const handleRefine = () => {
    goToStep(PRESELECCION_STEPS.location);
  };

  const handleRestart = () => {
    reset();
  };

  return (
    <div className={styles.wizard}>
      <PreseleccionStepper
        steps={stepDescriptors}
        activeStep={step}
        texts={texts.stepper}
      />

      {isResultsStep || step === PRESELECCION_STEPS.results ? (
        <PreseleccionResults
          form={form}
          result={result}
          isLoading={isLoading}
          feedback={feedback}
          texts={texts}
          catalogHref={catalogHref}
          onRefine={handleRefine}
          onRestart={handleRestart}
        />
      ) : (
        <PreseleccionStepForm
          step={step}
          form={form}
          texts={texts}
          isFirstStep={isFirstStep}
          isLastInputStep={isLastInputStep}
          onChange={handleChange}
          onBack={goBack}
          onNext={goNext}
        />
      )}
    </div>
  );
}
