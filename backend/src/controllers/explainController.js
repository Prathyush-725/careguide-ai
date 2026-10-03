import { addHistoryItem, getProfile } from '../data/store.js';
import { aiService } from '../services/aiService.js';
import { createHttpError } from '../middleware/errorHandler.js';
import { sanitizeUserText } from '../utils/sanitize.js';

export async function explainTopic(req, res, next) {
  try {
    const topic = sanitizeUserText(req.body.topic, 200);
    const context = sanitizeUserText(req.body.context, 1500);
    const result = await aiService.explain({ topic, context });

    const profile = getProfile();
    let saved = null;
    if (profile.saveHistory) {
      saved = await addHistoryItem({
        type: 'explanation',
        title: result.title,
        topic,
        preview: result.summary,
        result,
      });
    }

    res.json({ ...result, savedId: saved?.id || null });
  } catch (error) {
    next(error.status ? error : createHttpError(502, 'The explanation service is unavailable right now.'));
  }
}

export function listTopics(_req, res) {
  res.json({ topics: aiService.listCatalog() });
}
