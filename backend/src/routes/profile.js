import { Router } from 'express';
import { readProfile, saveProfile } from '../controllers/profileController.js';
import { validateBody } from '../middleware/validate.js';
import { PROFILE_LANGUAGES, PROFILE_LIMITS, PROFILE_ROLES } from '../utils/sanitize.js';

const router = Router();

router.get('/', readProfile);
router.put(
  '/',
  validateBody({
    name: { type: 'string', minLength: PROFILE_LIMITS.name.min, maxLength: PROFILE_LIMITS.name.max, label: 'Name' },
    preferredName: { type: 'string', maxLength: PROFILE_LIMITS.preferredName.max, label: 'Preferred name' },
    email: { type: 'string', maxLength: PROFILE_LIMITS.email.max, label: 'Email' },
    role: { type: 'string', enum: PROFILE_ROLES, label: 'Role' },
    language: { type: 'string', enum: PROFILE_LANGUAGES, label: 'Language' },
    careFocus: { type: 'string', maxLength: PROFILE_LIMITS.careFocus.max, label: 'Care focus' },
    notes: { type: 'string', maxLength: PROFILE_LIMITS.notes.max, label: 'Notes' },
  }),
  saveProfile,
);

export default router;
