import {
  DEFAULT_CURRENCY,
  DEFAULT_LOCALE,
} from "@/shared/constants/intl.constants";

export function formatCurrency(
  value: number,
  locale = DEFAULT_LOCALE,
  currency = DEFAULT_CURRENCY,
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}