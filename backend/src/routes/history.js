import { Router } from 'express';
import { getHistory, getHistoryById, removeHistory } from '../controllers/historyController.js';

const router = Router();

router.get('/', getHistory);
router.get('/:id', getHistoryById);
router.delete('/:id', removeHistory);

export default router;
