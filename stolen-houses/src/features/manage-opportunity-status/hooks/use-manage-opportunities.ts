"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import {
  createOpportunityRequest,
  deleteOpportunityRequest,
  getOpportunities,
  updateOpportunityRequest,
} from "@/entities/opportunity/api/opportunity.service";
import type {
  CreateOpportunityInput,
  Opportunity,
  OpportunityStatus,
} from "@/entities/opportunity/model/opportunity.types";
import { getProperties } from "@/entities/property/api/property.service";
import type { Property } from "@/entities/property/model/property.types";
import type { ManageOpportunitiesTexts } from "@/i18n/es/manage-opportunities";

import { CREATE_OPPORTUNITY_DEFAULT_FORM } from "@/features/manage-opportunity-status/model/manage-opportunities.constants";
import type {
  CreateOpportunityFormState,
  ManageOpportunitiesFeedback,
  OpportunityStatusFilter,
} from "@/features/manage-opportunity-status/model/manage-opportunities.types";

type UseManageOpportunitiesReturn = {
  opportunities: Opportunity[];
  filteredOpportunities: Opportunity[];
  statusFilter: OpportunityStatusFilter;
  setStatusFilter: (filter: OpportunityStatusFilter) => void;
  isLoading: boolean;
  pendingActionId: string | null;
  feedback: ManageOpportunitiesFeedback;
  countByStatus: Record<OpportunityStatusFilter, number>;
  totalEstimatedValue: number;
  closedWonCount: number;
  closedLostCount: number;
  properties: Property[];
  isLoadingProperties: boolean;
  form: CreateOpportunityFormState;
  isCreating: boolean;
  handleFormChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  handleCreate: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
  handleStatusChange: (
    id: string,
    nextStatus: OpportunityStatus,
  ) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
};

function sortByCreatedAtDesc(first: Opportunity, second: Opportunity): number {
  return (
    new Date(second.createdAt).getTime() -
    new Date(first.createdAt).getTime()
  );
}

const ACTIVE_PIPELINE_STATUSES: ReadonlyArray<OpportunityStatus> = [
  "new",
  "contacted",
  "visit_scheduled",
  "negotiating",
];

/**
 * useManageOpportunities
 * Needs: localized admin texts for feedback messages and delete confirmation.
 * Does: loads opportunities + property catalog in parallel, holds the create
 *       form state, exposes filter state, and provides handlers for create,
 *       status change and delete that talk to `/api/opportunities` and update
 *       the in-memory list optimistically.
 * Returns: lists (full + filtered), filter setter and counters, properties for
 *          the create form select, create form state + submission handler,
 *          and the mutation handlers consumed by the board widgets.
 */
export function useManageOpportunities(
  texts: ManageOpportunitiesTexts,
): UseManageOpportunitiesReturn {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [statusFilter, setStatusFilter] =
    useState<OpportunityStatusFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProperties, setIsLoadingProperties] = useState(true);
  const [pendingActionId, setPendingActionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<ManageOpportunitiesFeedback>(null);
  const [form, setForm] = useState<CreateOpportunityFormState>({
    ...CREATE_OPPORTUNITY_DEFAULT_FORM,
  });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchInitial() {
      setIsLoading(true);
      setIsLoadingProperties(true);

      try {
        const [opportunityData, propertyData] = await Promise.all([
          getOpportunities(),
          getProperties(),
        ]);

        if (mounted) {
          setOpportunities(opportunityData);
          setProperties(propertyData);
        }
      } catch (error) {
        if (mounted) {
          setFeedback({
            type: "error",
            text:
              error instanceof Error
                ? error.message
                : texts.messages.loadError,
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
          setIsLoadingProperties(false);
        }
      }
    }

    void fetchInitial();

    return () => {
      mounted = false;
    };
  }, [texts.messages.loadError]);

  const resetForm = useCallback(() => {
    setForm({ ...CREATE_OPPORTUNITY_DEFAULT_FORM });
  }, []);

  const handleFormChange = useCallback(
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value } = event.target;

      if (name === "propertyId") {
        const property = properties.find((candidate) => candidate.id === value);

        setForm((previous) => ({
          ...previous,
          propertyId: value,
          estimatedValue:
            property && previous.estimatedValue === ""
              ? String(property.price)
              : previous.estimatedValue,
        }));
        return;
      }

      setForm((previous) => ({ ...previous, [name]: value }));
    },
    [properties],
  );

  const handleCreate = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFeedback(null);

      if (
        !form.propertyId.trim() ||
        !form.clientName.trim() ||
        !form.clientEmail.trim() ||
        !form.clientPhone.trim()
      ) {
        setFeedback({
          type: "error",
          text: texts.createForm.feedback.missingFields,
        });
        return;
      }

      setIsCreating(true);

      try {
        const payload: CreateOpportunityInput = {
          propertyId: form.propertyId.trim(),
          clientName: form.clientName.trim(),
          clientEmail: form.clientEmail.trim(),
          clientPhone: form.clientPhone.trim(),
          status: form.status,
          source: "manual",
          notes: form.notes.trim(),
          estimatedValue: form.estimatedValue.trim()
            ? Number(form.estimatedValue)
            : undefined,
        };

        const created = await createOpportunityRequest(payload);

        setOpportunities((previous) => [created, ...previous]);
        setForm({ ...CREATE_OPPORTUNITY_DEFAULT_FORM });
        setFeedback({
          type: "success",
          text: texts.createForm.feedback.success,
        });
      } catch (error) {
        setFeedback({
          type: "error",
          text:
            error instanceof Error
              ? error.message
              : texts.messages.loadError,
        });
      } finally {
        setIsCreating(false);
      }
    },
    [form, texts.createForm.feedback, texts.messages.loadError],
  );

  const handleStatusChange = useCallback(
    async (id: string, nextStatus: OpportunityStatus) => {
      setPendingActionId(id);
      setFeedback(null);

      try {
        const updated = await updateOpportunityRequest(id, {
          status: nextStatus,
        });
        setOpportunities((previous) =>
          previous.map((opportunity) =>
            opportunity.id === id ? updated : opportunity,
          ),
        );
        setFeedback({
          type: "success",
          text: texts.messages.statusUpdateSuccess,
        });
      } catch (error) {
        setFeedback({
          type: "error",
          text:
            error instanceof Error
              ? error.message
              : texts.messages.statusUpdateError,
        });
      } finally {
        setPendingActionId(null);
      }
    },
    [texts.messages.statusUpdateError, texts.messages.statusUpdateSuccess],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = window.confirm(texts.card.deleteConfirm);

      if (!confirmed) {
        return;
      }

      setPendingActionId(id);
      setFeedback(null);

      try {
        await deleteOpportunityRequest(id);
        setOpportunities((previous) =>
          previous.filter((opportunity) => opportunity.id !== id),
        );
        setFeedback({
          type: "success",
          text: texts.messages.deleteSuccess,
        });
      } catch (error) {
        setFeedback({
          type: "error",
          text:
            error instanceof Error
              ? error.message
              : texts.messages.deleteError,
        });
      } finally {
        setPendingActionId(null);
      }
    },
    [
      texts.card.deleteConfirm,
      texts.messages.deleteError,
      texts.messages.deleteSuccess,
    ],
  );

  const sortedOpportunities = useMemo(
    () => [...opportunities].sort(sortByCreatedAtDesc),
    [opportunities],
  );

  const filteredOpportunities = useMemo(() => {
    if (statusFilter === "all") {
      return sortedOpportunities;
    }

    return sortedOpportunities.filter(
      (opportunity) => opportunity.status === statusFilter,
    );
  }, [sortedOpportunities, statusFilter]);

  const countByStatus = useMemo<Record<OpportunityStatusFilter, number>>(() => {
    const counts: Record<OpportunityStatusFilter, number> = {
      all: opportunities.length,
      new: 0,
      contacted: 0,
      visit_scheduled: 0,
      negotiating: 0,
      closed_won: 0,
      closed_lost: 0,
    };

    for (const opportunity of opportunities) {
      counts[opportunity.status] += 1;
    }

    return counts;
  }, [opportunities]);

  const totalEstimatedValue = useMemo(() => {
    return opportunities
      .filter((opportunity) =>
        ACTIVE_PIPELINE_STATUSES.includes(opportunity.status),
      )
      .reduce(
        (accumulator, opportunity) => accumulator + opportunity.estimatedValue,
        0,
      );
  }, [opportunities]);

  const closedWonCount = countByStatus.closed_won;
  const closedLostCount = countByStatus.closed_lost;

  return {
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
  };
}
