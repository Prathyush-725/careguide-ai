export function trimString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function stripControlChars(value) {
  return trimString(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
}

export function sanitizeUserText(value, max = 4000) {
  const text = stripControlChars(value);
  return text.length > max ? text.slice(0, max) : text;
}

export function collapseWhitespace(value) {
  return sanitizeUserText(value).replace(/\s+/g, ' ');
}

export function truncate(value, max = 4000) {
  const text = collapseWhitespace(value);
  return text.length > max ? text.slice(0, max) : text;
}

export function isNonEmptyString(value, min = 2, max = 2000) {
  if (typeof value !== 'string') return false;
  const text = value.trim();
  return text.length >= min && text.length <= max;
}

export function asStringArray(value, maxItems = 20) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems);
}

export function parseBoolean(value, fallback = false) {
  if (value === true || value === 1) return true;
  if (value === false || value === 0) return false;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true' || normalized === '1' || normalized === 'on' || normalized === 'yes') {
      return true;
    }
    if (normalized === 'false' || normalized === '0' || normalized === 'off' || normalized === 'no') {
      return false;
    }
  }
  return fallback;
}

export const PROFILE_LIMITS = {
  name: { min: 2, max: 80 },
  preferredName: { min: 0, max: 40 },
  email: { max: 120 },
  careFocus: { max: 120 },
  notes: { max: 500 },
};

export const PROFILE_ROLES = ['patient', 'caregiver', 'staff'];
export const PROFILE_LANGUAGES = ['en', 'es'];
