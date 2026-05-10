import type { Metadata } from "next";

import { MAIN_MENU_TEXTS } from "@/i18n/es/main-menu";
import { MenuGrid, MenuPageShell } from "@/widgets/menu-page";

export const metadata: Metadata = {
  title: MAIN_MENU_TEXTS.admin.metadataTitle,
  description: MAIN_MENU_TEXTS.admin.metadataDescription,
};

export default function AdminDashboardMenuPage() {
  const menu = MAIN_MENU_TEXTS.admin;

  return (
    <MenuPageShell header={menu.header}>
      <MenuGrid items={menu.items} ariaLabel={menu.header.title} />
    </MenuPageShell>
  );
}
