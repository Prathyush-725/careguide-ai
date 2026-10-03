import { deleteHistoryItem, getHistoryItem, listHistory } from '../data/store.js';
import { toHistorySummary } from '../models/history.js';
import { createHttpError } from '../middleware/errorHandler.js';

const ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function getHistory(_req, res) {
  res.json({ items: listHistory().map(toHistorySummary) });
}

export function getHistoryById(req, res, next) {
  if (!ID_PATTERN.test(req.params.id || '')) {
    return next(createHttpError(400, 'That saved item id is not valid.'));
  }
  const item = getHistoryItem(req.params.id);
  if (!item) {
    return next(createHttpError(404, 'That saved item could not be found.'));
  }
  res.json(item);
}

export async function removeHistory(req, res, next) {
  if (!ID_PATTERN.test(req.params.id || '')) {
    return next(createHttpError(400, 'That saved item id is not valid.'));
  }
  const removed = await deleteHistoryItem(req.params.id);
  if (!removed) {
    return next(createHttpError(404, 'That saved item could not be found.'));
  }
  res.json({ ok: true });
}
