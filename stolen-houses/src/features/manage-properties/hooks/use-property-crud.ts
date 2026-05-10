"use client";

import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import {
  createPropertyRequest,
  deletePropertyRequest,
  getProperties,
  updatePropertyRequest,
} from "@/entities/property/api/property.service";
import type { Property } from "@/entities/property/model/property.types";
import { PROPERTY_CRUD_DEFAULT_FORM } from "@/features/manage-properties/model/property-crud.constants";
import {
  mapFormToPropertyPayload,
  mapPropertyToForm,
} from "@/features/manage-properties/model/property-crud.mapper";
import type {
  FeedbackState,
  PropertyFormState,
} from "@/features/manage-properties/model/property-crud.types";
import type { PROPERTY_CRUD_TEXTS } from "@/i18n/es/property-crud";

type PropertyCrudTexts = typeof PROPERTY_CRUD_TEXTS;

type UsePropertyCrudReturn = {
  properties: Property[];
  form: PropertyFormState;
  isEditMode: boolean;
  isLoading: boolean;
  isSaving: boolean;
  feedback: FeedbackState;
  loadProperties: () => Promise<void>;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleEdit: (property: Property) => void;
  handleDelete: (id: string) => Promise<void>;
  resetForm: () => void;
};

/**
 * usePropertyCrud
 * Needs: localized CRUD texts (`PROPERTY_CRUD_TEXTS`) for confirmation prompts
 *        and feedback messages.
 * Does: loads the property catalog, manages the create/edit form state, and
 *       performs create/update/delete requests against the property service.
 * Returns: catalog list, form state with edit-mode flag, loading/saving flags,
 *          feedback state, and the change/submit/edit/delete/reset handlers
 *          consumed by the dashboard widgets.
 */
export function usePropertyCrud(
  texts: PropertyCrudTexts,
): UsePropertyCrudReturn {
  const [properties, setProperties] = useState<Property[]>([]);
  const [form, setForm] = useState<PropertyFormState>({
    ...PROPERTY_CRUD_DEFAULT_FORM,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const isEditMode = editingId !== null;

  const loadProperties = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (error) {
      setFeedback({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : texts.messages.unexpectedLoadError,
      });
    } finally {
      setIsLoading(false);
    }
  }, [texts.messages.unexpectedLoadError]);

  useEffect(() => {
    let mounted = true;

    async function fetchInitialData() {
      setIsLoading(true);
      try {
        const data = await getProperties();
        if (mounted) {
          setProperties(data);
        }
      } catch (error) {
        if (mounted) {
          setFeedback({
            type: "error",
            text:
              error instanceof Error
                ? error.message
                : texts.messages.unexpectedLoadError,
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchInitialData();

    return () => {
      mounted = false;
    };
  }, [texts.messages.unexpectedLoadError]);

  const resetForm = useCallback(() => {
    setForm({ ...PROPERTY_CRUD_DEFAULT_FORM });
    setEditingId(null);
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = event.target;
      const { name, value } = target;

      if (target instanceof HTMLInputElement && target.type === "checkbox") {
        setForm((prev) => ({
          ...prev,
          [name]: target.checked,
        }));
        return;
      }

      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSaving(true);
      setFeedback(null);

      try {
        const payload = mapFormToPropertyPayload(form);

        if (isEditMode && editingId) {
          await updatePropertyRequest(editingId, payload);
          setFeedback({
            type: "success",
            text: texts.messages.updateSuccess,
          });
        } else {
          await createPropertyRequest(payload);
          setFeedback({
            type: "success",
            text: texts.messages.createSuccess,
          });
        }

        resetForm();
        await loadProperties();
      } catch (error) {
        setFeedback({
          type: "error",
          text:
            error instanceof Error
              ? error.message
              : texts.messages.unexpectedSaveError,
        });
      } finally {
        setIsSaving(false);
      }
    },
    [form, isEditMode, editingId, loadProperties, resetForm, texts],
  );

  const handleEdit = useCallback((property: Property) => {
    setEditingId(property.id);
    setForm(mapPropertyToForm(property));
    setFeedback(null);
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = window.confirm(texts.messages.deleteConfirmation);

      if (!confirmed) {
        return;
      }

      try {
        await deletePropertyRequest(id);

        if (editingId === id) {
          resetForm();
        }

        setFeedback({
          type: "success",
          text: texts.messages.deleteSuccess,
        });

        await loadProperties();
      } catch (error) {
        setFeedback({
          type: "error",
          text:
            error instanceof Error
              ? error.message
              : texts.messages.unexpectedDeleteError,
        });
      }
    },
    [editingId, loadProperties, resetForm, texts],
  );

  return {
    properties,
    form,
    isEditMode,
    isLoading,
    isSaving,
    feedback,
    loadProperties,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  };
}
