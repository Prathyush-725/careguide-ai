import { addHistoryItem, getProfile } from '../data/store.js';
import { aiService } from '../services/aiService.js';
import { createHttpError } from '../middleware/errorHandler.js';
import { collapseWhitespace, sanitizeUserText } from '../utils/sanitize.js';

export async function prepareAppointment(req, res, next) {
  try {
    const payload = {
      appointmentType: collapseWhitespace(req.body.appointmentType),
      reason: sanitizeUserText(req.body.reason, 240),
      concerns: sanitizeUserText(req.body.concerns, 1500),
      medications: sanitizeUserText(req.body.medications, 800),
      goals: sanitizeUserText(req.body.goals, 400),
    };

    const result = await aiService.prepareAppointment(payload);
    const profile = getProfile();
    let saved = null;
    if (profile.saveHistory) {
      saved = await addHistoryItem({
        type: 'appointment',
        title: result.title,
        topic: payload.reason,
        preview: result.overview,
        result,
      });
    }

    res.json({ ...result, savedId: saved?.id || null });
  } catch (error) {
    next(error.status ? error : createHttpError(502, 'The appointment assistant is unavailable right now.'));
  }
}
