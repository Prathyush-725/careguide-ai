import { addHistoryItem, getProfile } from '../data/store.js';
import { aiService } from '../services/aiService.js';
import { createHttpError } from '../middleware/errorHandler.js';
import { sanitizeUserText } from '../utils/sanitize.js';

export async function generateQuestions(req, res, next) {
  try {
    const payload = {
      topic: sanitizeUserText(req.body.topic, 200),
      visitGoal: sanitizeUserText(req.body.visitGoal, 400),
      audience: req.body.audience === 'caregiver' ? 'caregiver' : 'patient',
    };
    const result = await aiService.generateQuestions(payload);
    const profile = getProfile();
    let saved = null;
    if (profile.saveHistory) {
      saved = await addHistoryItem({
        type: 'questions',
        title: result.title,
        topic: payload.topic,
        preview: result.printable?.[0] || 'Saved question list',
        result,
      });
    }

    res.json({ ...result, savedId: saved?.id || null });
  } catch (error) {
    next(error.status ? error : createHttpError(502, 'The question generator is unavailable right now.'));
  }
}
