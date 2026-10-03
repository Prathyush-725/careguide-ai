import { getProfile, updateProfile } from '../data/store.js';
import {
  PROFILE_LANGUAGES,
  PROFILE_LIMITS,
  PROFILE_ROLES,
  parseBoolean,
  sanitizeUserText,
} from '../utils/sanitize.js';
import { createHttpError } from '../middleware/errorHandler.js';

export function readProfile(_req, res) {
  res.json(getProfile());
}

export async function saveProfile(req, res, next) {
  try {
    const current = getProfile();
    const nextProfile = {
      name: sanitizeUserText(req.body.name ?? current.name, PROFILE_LIMITS.name.max),
      preferredName: sanitizeUserText(req.body.preferredName ?? current.preferredName, PROFILE_LIMITS.preferredName.max),
      email: sanitizeUserText(req.body.email ?? current.email, PROFILE_LIMITS.email.max),
      role: sanitizeUserText(req.body.role ?? current.role, 20),
      language: sanitizeUserText(req.body.language ?? current.language, 8),
      careFocus: sanitizeUserText(req.body.careFocus ?? current.careFocus, PROFILE_LIMITS.careFocus.max),
      notes: sanitizeUserText(req.body.notes ?? current.notes, PROFILE_LIMITS.notes.max),
      appointmentReminders: parseBoolean(req.body.appointmentReminders, current.appointmentReminders),
      saveHistory: parseBoolean(req.body.saveHistory, current.saveHistory),
    };

    const errors = [];
    if (nextProfile.name.length < PROFILE_LIMITS.name.min || nextProfile.name.length > PROFILE_LIMITS.name.max) {
      errors.push(`Name must be between ${PROFILE_LIMITS.name.min} and ${PROFILE_LIMITS.name.max} characters.`);
    }
    if (nextProfile.preferredName.length > PROFILE_LIMITS.preferredName.max) {
      errors.push(`Preferred name must be ${PROFILE_LIMITS.preferredName.max} characters or fewer.`);
    }
    if (nextProfile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextProfile.email)) {
      errors.push('Please enter a valid email address.');
    }
    if (nextProfile.email.length > PROFILE_LIMITS.email.max) {
      errors.push(`Email must be ${PROFILE_LIMITS.email.max} characters or fewer.`);
    }
    if (!PROFILE_ROLES.includes(nextProfile.role)) {
      errors.push('Role must be patient, caregiver, or staff.');
    }
    if (!PROFILE_LANGUAGES.includes(nextProfile.language)) {
      errors.push('Language must be a supported value.');
    }
    if (nextProfile.careFocus.length > PROFILE_LIMITS.careFocus.max) {
      errors.push(`Care focus must be ${PROFILE_LIMITS.careFocus.max} characters or fewer.`);
    }
    if (nextProfile.notes.length > PROFILE_LIMITS.notes.max) {
      errors.push(`Notes must be ${PROFILE_LIMITS.notes.max} characters or fewer.`);
    }

    if (errors.length) {
      throw createHttpError(400, 'Please correct the highlighted fields.', errors, 'validation_error');
    }

    const saved = await updateProfile(nextProfile);
    res.json(saved);
  } catch (error) {
    next(error);
  }
}
