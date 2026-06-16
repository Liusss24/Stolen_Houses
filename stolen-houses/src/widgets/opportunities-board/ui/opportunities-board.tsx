"use client";

import {
  OPPORTUNITY_STATUS_ORDER,
  type OpportunityStatus,
} from "@/entities/opportunity/model/opportunity.types";
import { useManageOpportunities } from "@/features/manage-opportunity-status/hooks/use-manage-opportunities";
import type { OpportunityStatusFilter } from "@/features/manage-opportunity-status/model/manage-opportunities.types";
import {
  MANAGE_OPPORTUNITIES_TEXTS,
  type ManageOpportunitiesTexts,
} from "@/i18n/es/manage-opportunities";
import { formatCurrency } from "@/shared/lib/format-currency";
import { OpportunityCreateForm } from "@/widgets/opportunity-create-form";

import { OpportunityRow } from "./opportunity-row";
import styles from "./opportunities-board.module.css";

export type OpportunitiesBoardProps = {
  texts?: ManageOpportunitiesTexts;
};

const FILTER_OPTIONS: ReadonlyArray<OpportunityStatusFilter> = [
  "all",
  ...OPPORTUNITY_STATUS_ORDER,
];

export function OpportunitiesBoard({
  texts = MANAGE_OPPORTUNITIES_TEXTS,
}: OpportunitiesBoardProps) {
  const {
    opportunities,
    filteredOpportunities,
    statusFilter,
    setStatusFilter,
    isLoading,
    pendingActionId,
    feedback,
    countByStatus,
    totalEstimatedValue,
    closedWonCount,
    closedLostCount,
    properties,
    isLoadingProperties,
    form,
    isCreating,
    handleFormChange,
    handleCreate,
    resetForm,
    handleStatusChange,
    handleDelete,
  } = useManageOpportunities(texts);

  const totalCount = opportunities.length;

  return (
    <div className={styles.board}>
      <aside className={styles.pipelinePanel} aria-label={texts.pipeline.title}>
        <div className={styles.pipelineHeader}>
          <span className={styles.pipelineTitle}>{texts.pipeline.title}</span>
          <span className={styles.pipelineSummary}>
            {texts.list.summary(
              String(filteredOpportunities.length),
              String(totalCount),
            )}
          </span>
        </div>

        <div className={styles.pipelineStat}>
          <span className={styles.pipelineLabel}>
            {texts.pipeline.totalLabel}
          </span>
          <span className={styles.pipelineValue}>
            {countByStatus.all -
              countByStatus.closed_won -
              countByStatus.closed_lost}
          </span>
        </div>

        <div className={styles.pipelineStat}>
          <span className={styles.pipelineLabel}>
            {texts.pipeline.valueLabel}
          </span>
          <span className={styles.pipelineValue}>
            {formatCurrency(totalEstimatedValue)}
          </span>
        </div>

        <div className={styles.pipelineStat}>
          <span className={styles.pipelineLabel}>
            {texts.pipeline.closedWonLabel}
          </span>
          <span className={styles.pipelineValue}>{closedWonCount}</span>
        </div>

        <div className={styles.pipelineStat}>
          <span className={styles.pipelineLabel}>
            {texts.pipeline.closedLostLabel}
          </span>
          <span className={styles.pipelineValue}>{closedLostCount}</span>
        </div>
      </aside>

      <OpportunityCreateForm
        texts={texts}
        form={form}
        properties={properties}
        isLoadingProperties={isLoadingProperties}
        isCreating={isCreating}
        onChange={handleFormChange}
        onSubmit={handleCreate}
        onReset={resetForm}
      />

      <section className={styles.list}>
        <header className={styles.toolbar}>
          <div className={styles.titleBlock}>
            <h2 className={styles.listTitle}>{texts.list.title}</h2>
            <span className={styles.listSummary}>
              {texts.list.summary(
                String(filteredOpportunities.length),
                String(totalCount),
              )}
            </span>
          </div>

          <fieldset className={styles.filters}>
            <legend className="sr-only">{texts.filters.legend}</legend>
            {FILTER_OPTIONS.map((option) => {
              const isActive = statusFilter === option;
              const label =
                option === "all"
                  ? texts.filters.allLabel
                  : texts.status[option as OpportunityStatus];

              return (
                <button
                  key={option}
                  type="button"
                  className={`${styles.filterChip} ${
                    isActive ? styles.filterActive : ""
                  }`}
                  onClick={() => setStatusFilter(option)}
                  aria-pressed={isActive}
                >
                  {label}
                  <span className={styles.filterCount}>
                    {countByStatus[option] ?? 0}
                  </span>
                </button>
              );
            })}
          </fieldset>
        </header>

        {feedback ? (
          <p
            role={feedback.type === "error" ? "alert" : "status"}
            className={`${styles.feedback} ${
              feedback.type === "success"
                ? styles.feedbackSuccess
                : styles.feedbackError
            }`}
          >
            {feedback.text}
          </p>
        ) : null}

        {isLoading ? (
          <p role="status" className={styles.status}>
            {texts.list.loading}
          </p>
        ) : totalCount === 0 ? (
          <p role="status" className={styles.status}>
            {texts.list.empty}
          </p>
        ) : filteredOpportunities.length === 0 ? (
          <p role="status" className={styles.status}>
            {texts.list.emptyFiltered}
          </p>
        ) : (
          <div className={styles.rows}>
            {filteredOpportunities.map((opportunity) => (
              <OpportunityRow
                key={opportunity.id}
                opportunity={opportunity}
                texts={texts}
                isPending={pendingActionId === opportunity.id}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
