import { Router } from 'express';
import { env } from '../config/env.js';
import { getDashboard } from '../controllers/dashboardController.js';
import explainRoutes from './explain.js';
import appointmentRoutes from './appointment.js';
import questionsRoutes from './questions.js';
import historyRoutes from './history.js';
import profileRoutes from './profile.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'careguide-ai',
    mode: env.demoMode ? 'demo' : 'local',
    time: new Date().toISOString(),
  });
});

router.get('/dashboard', getDashboard);
router.use('/explain', explainRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/questions', questionsRoutes);
router.use('/history', historyRoutes);
router.use('/profile', profileRoutes);

export default router;
