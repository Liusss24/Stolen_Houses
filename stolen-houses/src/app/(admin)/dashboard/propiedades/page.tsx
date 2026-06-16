"use client";

import { usePropertyCrud } from "@/features/manage-properties/hooks/use-property-crud";
import { PROPERTY_CRUD_TEXTS } from "@/i18n/es/property-crud";
import { AdminTopBar } from "@/shared/ui/admin-top-bar/admin-top-bar";
import { Feedback } from "@/shared/ui/feedback/feedback";
import { PropertyCrudForm } from "@/widgets/property-crud-form/ui/property-crud-form";
import { PropertyCrudList } from "@/widgets/property-crud-list/ui/property-crud-list";
import styles from "./page.module.css";

export default function DashboardPropertiesPage() {
  const texts = PROPERTY_CRUD_TEXTS;

  const {
    properties,
    form,
    isEditMode,
    isLoading,
    isSaving,
    feedback,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = usePropertyCrud(texts);

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <AdminTopBar backHref="/dashboard" />
        <header className={styles.header}>
          <div className={styles.dividerRow}>
            <span className={styles.divider} aria-hidden="true" />
            <span className={styles.badge}>{texts.header.badge}</span>
            <span className={styles.divider} aria-hidden="true" />
          </div>
          <h1 className={styles.title}>{texts.header.title}</h1>
          <p className={styles.description}>{texts.header.description}</p>
        </header>

        {feedback ? (
          <Feedback type={feedback.type} text={feedback.text} />
        ) : null}

        <div className={styles.contentGrid}>
          <PropertyCrudForm
            form={form}
            isEditMode={isEditMode}
            isSaving={isSaving}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={resetForm}
          />

          <PropertyCrudList
            properties={properties}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </section>
  );
}