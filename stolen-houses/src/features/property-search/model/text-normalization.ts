const COMBINING_DIACRITICS_PATTERN = /[̀-ͯ]/g;
const WHITESPACE_PATTERN = /\s+/;

export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(COMBINING_DIACRITICS_PATTERN, "")
    .toLowerCase()
    .trim();
}

export function tokenize(value: string): string[] {
  return normalizeText(value).split(WHITESPACE_PATTERN).filter(Boolean);
}
