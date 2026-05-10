export function clamp(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export function parseNonNegativeNumber(value: string): number | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  const numericValue = Number(trimmedValue);

  if (!Number.isFinite(numericValue) || numericValue < 0) {
    return null;
  }

  return numericValue;
}

export function isTextValueActive(value: string): boolean {
  return value.trim().length > 0;
}

export function isPositiveNumberFilterActive(value: string): boolean {
  const numericValue = parseNonNegativeNumber(value);

  return numericValue !== null && numericValue > 0;
}
