import type { Metadata } from "next";

import { MAIN_MENU_TEXTS } from "@/i18n/es/main-menu";
import { MenuPageShell, PlaceholderPanel } from "@/widgets/menu-page";

export const metadata: Metadata = {
  title: MAIN_MENU_TEXTS.citas.metadataTitle,
  description: MAIN_MENU_TEXTS.citas.metadataDescription,
};

export default function AdminAppointmentsPage() {
  const texts = MAIN_MENU_TEXTS.citas;

  return (
    <MenuPageShell header={texts.header}>
      <PlaceholderPanel
        message={texts.body.message}
        ariaLabel={texts.header.title}
        action={{
          href: texts.body.actionHref,
          label: texts.body.actionLabel,
        }}
      />
    </MenuPageShell>
  );
}
