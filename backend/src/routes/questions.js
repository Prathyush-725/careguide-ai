import { Router } from 'express';
import { generateQuestions } from '../controllers/questionsController.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

router.post(
  '/',
  validateBody({
    topic: { required: true, type: 'string', minLength: 2, maxLength: 200, label: 'Topic' },
    visitGoal: { type: 'string', maxLength: 400, label: 'Visit goal' },
    audience: { type: 'string', enum: ['patient', 'caregiver'], label: 'Audience' },
  }),
  generateQuestions,
);

export default router;
