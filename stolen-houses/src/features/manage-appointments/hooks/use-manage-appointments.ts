"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  deleteAppointmentRequest,
  getAppointments,
  updateAppointmentRequest,
} from "@/entities/appointment/api/appointment.service";
import type {
  Appointment,
  AppointmentStatus,
} from "@/entities/appointment/model/appointment.types";
import { createOpportunityRequest } from "@/entities/opportunity/api/opportunity.service";
import {
  OPPORTUNITY_SOURCES,
  OPPORTUNITY_STATUSES,
} from "@/entities/opportunity/model/opportunity.types";
import type { ManageAppointmentsTexts } from "@/i18n/es/manage-appointments";

import type {
  AppointmentStatusFilter,
  ManageAppointmentsFeedback,
} from "@/features/manage-appointments/model/manage-appointments.types";

type UseManageAppointmentsReturn = {
  appointments: Appointment[];
  filteredAppointments: Appointment[];
  statusFilter: AppointmentStatusFilter;
  setStatusFilter: (filter: AppointmentStatusFilter) => void;
  isLoading: boolean;
  pendingActionId: string | null;
  convertedAppointmentIds: ReadonlySet<string>;
  feedback: ManageAppointmentsFeedback;
  reload: () => Promise<void>;
  handleStatusChange: (
    id: string,
    nextStatus: AppointmentStatus,
  ) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleConvertToOpportunity: (appointment: Appointment) => Promise<void>;
  countByStatus: Record<AppointmentStatusFilter, number>;
};

function sortByScheduledFor(first: Appointment, second: Appointment): number {
  return (
    new Date(first.scheduledFor).getTime() -
    new Date(second.scheduledFor).getTime()
  );
}

/**
 * useManageAppointments
 * Needs: localized admin texts (`MANAGE_APPOINTMENTS_TEXTS`) for feedback
 *        messages and confirmation prompts.
 * Does: loads the full appointment list once on mount, holds a status filter
 *       client-side, and exposes update-status and delete handlers that talk
 *       to `/api/appointments/[id]` and patch the in-memory list optimistically
 *       (re-fetches on failure).
 * Returns: full + filtered appointment list, status filter setter, per-status
 *          counters, loading/pending flags, feedback message, and the
 *          mutation handlers consumed by the admin widgets.
 */
export function useManageAppointments(
  texts: ManageAppointmentsTexts,
): UseManageAppointmentsReturn {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] =
    useState<AppointmentStatusFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [pendingActionId, setPendingActionId] = useState<string | null>(null);
  const [convertedAppointmentIds, setConvertedAppointmentIds] = useState<
    ReadonlySet<string>
  >(() => new Set<string>());
  const [feedback, setFeedback] = useState<ManageAppointmentsFeedback>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      setFeedback({
        type: "error",
        text:
          error instanceof Error ? error.message : texts.messages.loadError,
      });
    } finally {
      setIsLoading(false);
    }
  }, [texts.messages.loadError]);

  useEffect(() => {
    let mounted = true;

    async function fetchInitial() {
      setIsLoading(true);
      try {
        const data = await getAppointments();
        if (mounted) {
          setAppointments(data);
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
        }
      }
    }

    void fetchInitial();

    return () => {
      mounted = false;
    };
  }, [texts.messages.loadError]);

  const handleStatusChange = useCallback(
    async (id: string, nextStatus: AppointmentStatus) => {
      setPendingActionId(id);
      setFeedback(null);

      try {
        const updated = await updateAppointmentRequest(id, {
          status: nextStatus,
        });
        setAppointments((previous) =>
          previous.map((appointment) =>
            appointment.id === id ? updated : appointment,
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

  const handleConvertToOpportunity = useCallback(
    async (appointment: Appointment) => {
      setPendingActionId(appointment.id);
      setFeedback(null);

      try {
        await createOpportunityRequest({
          propertyId: appointment.propertyId,
          clientName: appointment.clientName,
          clientEmail: appointment.clientEmail,
          clientPhone: appointment.clientPhone,
          status: OPPORTUNITY_STATUSES.visitScheduled,
          source: OPPORTUNITY_SOURCES.appointment,
          appointmentId: appointment.id,
          notes: appointment.notes,
        });

        setConvertedAppointmentIds((previous) => {
          const next = new Set(previous);
          next.add(appointment.id);
          return next;
        });

        setFeedback({
          type: "success",
          text: texts.messages.convertSuccess,
        });
      } catch (error) {
        setFeedback({
          type: "error",
          text:
            error instanceof Error
              ? error.message
              : texts.messages.convertError,
        });
      } finally {
        setPendingActionId(null);
      }
    },
    [texts.messages.convertError, texts.messages.convertSuccess],
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
        await deleteAppointmentRequest(id);
        setAppointments((previous) =>
          previous.filter((appointment) => appointment.id !== id),
        );
        setFeedback({
          type: "success",
          text: texts.messages.deleteSuccess,
        });
      } catch (error) {
        setFeedback({
          type: "error",
          text:
            error instanceof Error ? error.message : texts.messages.deleteError,
        });
      } finally {
        setPendingActionId(null);
      }
    },
    [texts.card.deleteConfirm, texts.messages.deleteError, texts.messages.deleteSuccess],
  );

  const sortedAppointments = useMemo(
    () => [...appointments].sort(sortByScheduledFor),
    [appointments],
  );

  const filteredAppointments = useMemo(() => {
    if (statusFilter === "all") {
      return sortedAppointments;
    }

    return sortedAppointments.filter(
      (appointment) => appointment.status === statusFilter,
    );
  }, [sortedAppointments, statusFilter]);

  const countByStatus = useMemo<Record<AppointmentStatusFilter, number>>(() => {
    const counts: Record<AppointmentStatusFilter, number> = {
      all: appointments.length,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
    };

    for (const appointment of appointments) {
      counts[appointment.status] += 1;
    }

    return counts;
  }, [appointments]);

  return {
    appointments,
    filteredAppointments,
    statusFilter,
    setStatusFilter,
    isLoading,
    pendingActionId,
    convertedAppointmentIds,
    feedback,
    reload,
    handleStatusChange,
    handleDelete,
    handleConvertToOpportunity,
    countByStatus,
  };
}
