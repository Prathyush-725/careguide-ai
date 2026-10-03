import { Router } from 'express';
import { prepareAppointment } from '../controllers/appointmentController.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

router.post(
  '/',
  validateBody({
    appointmentType: {
      required: true,
      type: 'string',
      enum: ['annual-physical', 'follow-up', 'specialist', 'diagnostic', 'new-patient', 'telehealth', 'urgent'],
      label: 'Appointment type',
    },
    reason: { required: true, type: 'string', minLength: 3, maxLength: 240, label: 'Visit reason' },
    concerns: { type: 'string', maxLength: 1500, label: 'Concerns' },
    medications: { type: 'string', maxLength: 800, label: 'Medications' },
    goals: { type: 'string', maxLength: 400, label: 'Visit goals' },
  }),
  prepareAppointment,
);

export default router;
