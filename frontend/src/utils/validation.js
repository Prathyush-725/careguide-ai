export const PROFILE_LIMITS = {
  name: { min: 2, max: 80 },
  preferredName: { max: 40 },
  email: { max: 120 },
  careFocus: { max: 120 },
  notes: { max: 500 },
};

export const PROFILE_ROLES = ['patient', 'caregiver', 'staff'];
export const PROFILE_LANGUAGES = ['en', 'es'];

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateProfile(values) {
  const errors = {};
  const name = (values.name || '').trim();
  const preferredName = (values.preferredName || '').trim();
  const email = (values.email || '').trim();
  const careFocus = (values.careFocus || '').trim();
  const notes = (values.notes || '').trim();

  if (name.length < PROFILE_LIMITS.name.min || name.length > PROFILE_LIMITS.name.max) {
    errors.name = `Please enter a name between ${PROFILE_LIMITS.name.min} and ${PROFILE_LIMITS.name.max} characters.`;
  }
  if (preferredName.length > PROFILE_LIMITS.preferredName.max) {
    errors.preferredName = `Preferred name must be ${PROFILE_LIMITS.preferredName.max} characters or fewer.`;
  }
  if (email && !isValidEmail(email)) {
    errors.email = 'Enter a valid email or leave it blank.';
  }
  if (email.length > PROFILE_LIMITS.email.max) {
    errors.email = `Email must be ${PROFILE_LIMITS.email.max} characters or fewer.`;
  }
  if (!PROFILE_ROLES.includes(values.role)) {
    errors.role = 'Choose patient, caregiver, or clinic staff.';
  }
  if (!PROFILE_LANGUAGES.includes(values.language)) {
    errors.language = 'Choose a supported language.';
  }
  if (careFocus.length > PROFILE_LIMITS.careFocus.max) {
    errors.careFocus = `Care focus must be ${PROFILE_LIMITS.careFocus.max} characters or fewer.`;
  }
  if (notes.length > PROFILE_LIMITS.notes.max) {
    errors.notes = `Notes must be ${PROFILE_LIMITS.notes.max} characters or fewer.`;
  }
  return errors;
}
