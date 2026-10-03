import { env } from '../config/env.js';
import { getDashboardStats, getProfile } from '../data/store.js';
import { DISCLAIMER } from '../data/knowledgeBase.js';

export function getDashboard(_req, res) {
  const profile = getProfile();
  const stats = getDashboardStats();

  res.json({
    greeting: `Welcome back, ${profile.preferredName || profile.name.split(' ')[0]}.`,
    disclaimer: DISCLAIMER,
    demoMode: env.demoMode,
    profile: {
      name: profile.name,
      preferredName: profile.preferredName,
      role: profile.role,
      careFocus: profile.careFocus,
      appointmentReminders: profile.appointmentReminders,
    },
    reminderPreference: profile.appointmentReminders
      ? 'You asked CareGuide to remember that you like appointment-prep checklists. This is a saved preference only. The app does not send emails, texts, or calendar reminders.'
      : '',
    stats,
    shortcuts: [
      {
        to: '/explain',
        title: 'Explain a health topic',
        description: 'Turn a diagnosis, test, or medicine into plain language.',
      },
      {
        to: '/appointment',
        title: 'Prepare for a visit',
        description: 'Get a checklist and talking points before you go.',
      },
      {
        to: '/questions',
        title: 'Generate questions',
        description: 'Walk in with a focused list for your provider.',
      },
    ],
  });
}
