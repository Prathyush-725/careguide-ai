import { Router } from 'express';
import { explainTopic, listTopics } from '../controllers/explainController.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

router.get('/topics', listTopics);
router.post(
  '/',
  validateBody({
    topic: { required: true, type: 'string', minLength: 2, maxLength: 200, label: 'Health topic' },
    context: { type: 'string', maxLength: 1500, label: 'Extra context' },
  }),
  explainTopic,
);

export default router;
