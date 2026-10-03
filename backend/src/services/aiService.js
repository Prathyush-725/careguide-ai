import { DISCLAIMER, findKnowledgeMatches, knowledgeBase } from '../data/knowledgeBase.js';
import { collapseWhitespace } from '../utils/sanitize.js';

const APPOINTMENT_TYPES = {
  'annual-physical': 'annual physical or wellness visit',
  'follow-up': 'follow-up visit',
  specialist: 'specialist consultation',
  diagnostic: 'diagnostic or testing visit',
  'new-patient': 'new-patient visit',
  telehealth: 'telehealth visit',
  urgent: 'urgent or same-week visit',
};

function delay(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pickRelatedQuestions(matches, extra = []) {
  const fromKnowledge = matches.flatMap((entry) => entry.questions || []);
  const unique = [...new Set([...extra, ...fromKnowledge])];
  return unique.slice(0, 8);
}

function genericExplanation(topic) {
  const safeTopic = topic || 'this topic';
  return {
    title: `Study notes for “${safeTopic}”`,
    category: 'general',
    matched: false,
    summary:
      `CareGuide does not have a reviewed education article for “${safeTopic}.” The notes below are only a way to prepare for a conversation with a clinician. They are not an explanation of your case and not a diagnosis.`,
    explanation:
      `When a phrase is not in this app’s sample library, CareGuide will not invent a medical definition. The same words can mean a symptom, a test, a medicine, or something unrelated. A licensed clinician who can review your history is the right person to say what this means for you.`,
    keyPoints: [
      'This is educational visit-prep, not a personalized interpretation.',
      'Bring the exact words from a portal message, after-visit summary, or label.',
      'Ask what the term means in your situation and what happens next.',
      'Do not start, stop, or change treatment based on this screen.',
    ],
    whenToSeekCare:
      'Seek urgent or emergency care for severe chest pain, trouble breathing, sudden weakness, confusion, fainting, uncontrolled bleeding, or thoughts of self-harm. For non-urgent questions, use your clinic’s advice line or a scheduled visit.',
    questions: [
      `What does “${safeTopic}” mean in my specific situation?`,
      'What are you considering, and what would change the plan?',
      'What tests, medicines, or follow-up do you recommend, if any?',
      'What warning signs should make me call or go in sooner?',
      'What can I do at home while we wait for the next step?',
    ],
  };
}

function composeExplanation(topic, matches) {
  if (!matches.length) {
    return genericExplanation(topic);
  }

  const primary = matches[0];
  const extras = matches.slice(1, 3);
  const extraNote = extras.length
    ? ` Related sample topics that also matched your wording: ${extras.map((item) => item.title).join('; ')}.`
    : '';

  return {
    title: primary.title,
    category: primary.category,
    matched: true,
    summary: primary.summary,
    explanation: `${primary.explanation}${extraNote} This is general education, not a reading of your chart.`,
    keyPoints: primary.keyPoints,
    whenToSeekCare: primary.whenToSeekCare,
    questions: pickRelatedQuestions(matches, primary.questions),
    matchedTopics: matches.map((item) => item.title),
  };
}

function composeAppointmentPrep({ appointmentType, reason, concerns, medications, goals }) {
  const typeLabel = APPOINTMENT_TYPES[appointmentType] || 'clinic visit';
  const matches = findKnowledgeMatches(reason, [concerns, goals].filter(Boolean).join(' '));
  const primary = matches[0];

  const whatToExpect = [
    `A ${typeLabel} usually starts with a review of why you are here, current medicines, and any changes since the last visit.`,
    'The clinician may ask about symptoms, timing, what makes things better or worse, and how they affect sleep, work, or daily life.',
    primary
      ? `You mentioned wording related to ${primary.title.toLowerCase()}. That may or may not be what the visit is about; only your clinician can decide.`
      : 'If time is short, lead with your top one or two concerns so they are not left for the last minute.',
    appointmentType === 'telehealth'
      ? 'For video visits, test your camera, sit in a private space, and have a medicine list and home readings nearby.'
      : 'Arrive a little early so check-in, vitals, and portal updates do not eat into clinician time.',
  ];

  const howToPrepare = [
    'Write your top 3 concerns in order of importance.',
    'Bring an updated list of medicines, vitamins, and allergies, including doses if you know them.',
    medications
      ? `Share this medicine context with the team: ${medications}`
      : 'Note any medicines you started, stopped, or have trouble taking.',
    'Bring home logs if you have them: blood pressure, glucose, peak flow, headache days, or symptom photos.',
    'Know your pharmacy name and whether you prefer 30- or 90-day fills.',
    appointmentType === 'diagnostic'
      ? 'Confirm prep instructions (fasting, holding medicines, contrast allergies) the day before.'
      : 'Ask whether fasting or holding any medicine is needed if labs or procedures are likely.',
  ];

  const questions = pickRelatedQuestions(matches, [
    `Given that I am coming in for a ${typeLabel}, what should we prioritize today?`,
    reason ? `How should I understand “${reason}” in my situation?` : 'What is the most important concern to cover today?',
    'What are the next tests or treatments, if any, and what are we hoping to learn?',
    'What should I do if symptoms change before the follow-up?',
    goals ? `Can we talk about this goal: ${goals}` : 'What would a useful next step look like after this visit?',
  ]);

  return {
    title: `Preparing for your ${typeLabel}`,
    appointmentType: typeLabel,
    matched: Boolean(primary),
    overview: primary
      ? `This is a visit-prep checklist. CareGuide found sample education related to ${primary.title.toLowerCase()}, but that is not a confirmation of your diagnosis.`
      : `This is a general checklist for a ${typeLabel}. CareGuide cannot predict what will happen at your appointment.`,
    whatToExpect,
    howToPrepare,
    questions,
    bringList: [
      'Photo ID and insurance card if required',
      'Medicine and allergy list',
      'Recent test results or portal printouts from other clinics',
      'A support person if you want a second set of ears',
      'Your written questions',
    ],
    matchedTopics: matches.map((item) => item.title),
  };
}

function composeQuestions({ topic, visitGoal, audience }) {
  const matches = findKnowledgeMatches(topic, visitGoal);
  const who = audience === 'caregiver' ? 'we' : 'I';
  const unmatched = !matches.length;
  const base = unmatched ? genericExplanation(topic).questions : pickRelatedQuestions(matches);

  const tailored = [
    `Can you explain this in everyday words so ${who} can repeat the plan at home?`,
    visitGoal
      ? `My main goal for this visit is: ${visitGoal}. Is that realistic, and how would we get there?`
      : `What is the one thing ${who} should focus on before the next visit?`,
    `What are the benefits, risks, and alternatives of the option you recommend?`,
    `Which symptoms mean ${who} should call the clinic versus going to urgent or emergency care?`,
    `How and when will ${who} get results or hear about next steps?`,
  ];

  return {
    title: unmatched ? `Questions to ask about “${topic}”` : `Questions about ${matches[0].title}`,
    matched: !unmatched,
    groups: [
      {
        heading: 'Clarify the meaning',
        items: base.slice(0, 3),
      },
      {
        heading: 'Understand the plan',
        items: tailored.slice(0, 3),
      },
      {
        heading: 'Stay safe after the visit',
        items: [base[3], tailored[3], tailored[4]].filter(Boolean),
      },
    ],
    printable: [...new Set([...base, ...tailored])].slice(0, 10),
    matchedTopics: matches.map((item) => item.title),
  };
}

async function mockExplain({ topic, context }) {
  await delay();
  const matches = findKnowledgeMatches(topic, context);
  return {
    provider: 'mock',
    disclaimer: DISCLAIMER,
    ...composeExplanation(topic, matches),
  };
}

async function mockAppointment(payload) {
  await delay();
  return {
    provider: 'mock',
    disclaimer: DISCLAIMER,
    ...composeAppointmentPrep(payload),
  };
}

async function mockQuestions(payload) {
  await delay();
  return {
    provider: 'mock',
    disclaimer: DISCLAIMER,
    ...composeQuestions(payload),
  };
}

export const aiService = {
  async explain(payload) {
    const topic = collapseWhitespace(payload.topic);
    const context = collapseWhitespace(payload.context || '');
    return mockExplain({ topic, context });
  },

  async prepareAppointment(payload) {
    const normalized = {
      appointmentType: collapseWhitespace(payload.appointmentType),
      reason: collapseWhitespace(payload.reason),
      concerns: collapseWhitespace(payload.concerns || ''),
      medications: collapseWhitespace(payload.medications || ''),
      goals: collapseWhitespace(payload.goals || ''),
    };
    return mockAppointment(normalized);
  },

  async generateQuestions(payload) {
    const normalized = {
      topic: collapseWhitespace(payload.topic),
      visitGoal: collapseWhitespace(payload.visitGoal || ''),
      audience: payload.audience === 'caregiver' ? 'caregiver' : 'patient',
    };
    return mockQuestions(normalized);
  },

  listCatalog() {
    return knowledgeBase.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
    }));
  },
};
