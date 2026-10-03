export const DISCLAIMER =
  'CareGuide AI provides general educational information only. It is not a medical diagnosis, treatment plan, or substitute for professional medical advice. Always discuss personal health decisions with a licensed clinician.';

export const knowledgeBase = [
  {
    id: 'hypertension',
    keywords: ['hypertension', 'high blood pressure', 'blood pressure', 'bp', 'htn'],
    title: 'High blood pressure (hypertension)',
    category: 'condition',
    summary:
      'Blood pressure is the force of blood against artery walls. Hypertension means that force stays higher than recommended over time, which can quietly strain the heart, brain, kidneys, and blood vessels.',
    explanation:
      'Think of arteries as garden hoses. If water pressure stays too high, the hose wears out faster. High blood pressure often has no obvious symptoms, which is why it is sometimes called a silent condition. A reading has two numbers: systolic (when the heart squeezes) and diastolic (when the heart rests). Many adults are considered to have elevated or high blood pressure when readings are repeatedly at or above 130/80, but your clinician interprets your numbers in context.',
    keyPoints: [
      'It is usually diagnosed from repeated readings, not a single visit.',
      'Lifestyle changes and medicines can both help lower risk.',
      'Home monitoring can show patterns that a one-time clinic reading may miss.',
      'Uncontrolled high blood pressure raises risk for stroke, heart attack, and kidney disease.',
    ],
    whenToSeekCare:
      'Seek urgent care for severe headache, chest pain, shortness of breath, sudden weakness, confusion, or vision changes. Otherwise, bring recent home readings to your next visit.',
    questions: [
      'What do my recent blood pressure numbers mean for my overall risk?',
      'Should I monitor at home, and what range should prompt a call?',
      'Would a medicine change, diet change, or both be the next step?',
      'How often should we recheck labs such as kidney function or electrolytes?',
    ],
  },
  {
    id: 'diabetes',
    keywords: ['diabetes', 'type 2', 'type 2 diabetes', 'blood sugar', 'a1c', 'hba1c', 'glucose'],
    title: 'Type 2 diabetes and blood sugar',
    category: 'condition',
    summary:
      'Type 2 diabetes means the body has trouble using insulin well, so sugar stays higher in the blood than it should. Over time that can affect the eyes, kidneys, nerves, heart, and feet.',
    explanation:
      'Insulin is like a key that helps sugar move from the bloodstream into cells for energy. In type 2 diabetes the lock gets rusty: the body still makes insulin, but cells do not respond as well, and sugar builds up. Clinicians often look at fasting glucose, A1C (a roughly 3-month average), and symptoms. Care usually combines food patterns, activity, sleep, medicines if needed, and regular screening.',
    keyPoints: [
      'A1C is an average, not a day-to-day snapshot.',
      'Lows and highs can both be important, especially if you take insulin or certain pills.',
      'Foot checks, eye exams, and kidney labs are part of routine diabetes care.',
      'Small, repeatable habits often matter more than a perfect short-term diet.',
    ],
    whenToSeekCare:
      'Get urgent help for confusion, vomiting, very high readings with illness, or signs of very low blood sugar such as shaking, sweating, or trouble staying awake.',
    questions: [
      'What A1C or glucose range are we aiming for, and why?',
      'Which of my symptoms might be related to blood sugar?',
      'Do I need any screening labs or referrals this year?',
      'What should I do on sick days if I cannot eat normally?',
    ],
  },
  {
    id: 'lipid-panel',
    keywords: ['cholesterol', 'lipid', 'lipid panel', 'ldl', 'hdl', 'triglycerides', 'statin'],
    title: 'Cholesterol and lipid panel',
    category: 'test',
    summary:
      'A lipid panel measures fats in the blood, including LDL, HDL, and triglycerides. These numbers help estimate long-term heart and blood-vessel risk.',
    explanation:
      'LDL is often called “bad” cholesterol because extra amounts can contribute to plaque in arteries. HDL helps carry cholesterol away. Triglycerides rise with extra calories, alcohol, or poorly controlled blood sugar. Your clinician looks at the whole picture: age, blood pressure, diabetes, smoking, family history, and these numbers together. A statin is one common medicine that can lower LDL and heart-event risk when lifestyle changes are not enough.',
    keyPoints: [
      'One lab result is a snapshot; trends and overall risk matter more.',
      'Fasting may or may not be required depending on the lab and your history.',
      'Food, activity, weight, alcohol, and medicines can all change lipids.',
      'Treatment is about lowering future heart-event risk, not chasing a perfect number alone.',
    ],
    whenToSeekCare:
      'Discuss unexpected muscle pain after starting a cholesterol medicine, or very high triglycerides, with your clinician. Chest pain or sudden shortness of breath needs emergency care.',
    questions: [
      'Which of these lipid numbers is most important for my risk?',
      'Do I need a statin or another medicine, or is lifestyle the first step?',
      'How soon should we repeat the panel after a change?',
      'Are there side effects I should watch for if I start treatment?',
    ],
  },
  {
    id: 'cbc',
    keywords: ['cbc', 'complete blood count', 'anemia', 'white blood cell', 'hemoglobin', 'hematocrit'],
    title: 'Complete blood count (CBC)',
    category: 'test',
    summary:
      'A CBC looks at red cells, white cells, and platelets. It can help explain fatigue, infection risk, bleeding, or how the body is responding to illness or treatment.',
    explanation:
      'Red blood cells carry oxygen. If hemoglobin is low, a person may feel tired, short of breath, or pale. White blood cells help fight infection and can rise or fall with illness, medicines, or bone-marrow issues. Platelets help blood clot. A CBC does not by itself say exactly why a value is off, so clinicians often combine it with symptoms, other labs, and sometimes follow-up tests.',
    keyPoints: [
      'Mild changes are common and not always urgent.',
      'The same number can mean different things depending on symptoms.',
      'Iron studies, B12, or a smear may be next if anemia is found.',
      'Ask for a copy of the result and which values, if any, need action.',
    ],
    whenToSeekCare:
      'Seek prompt care for fainting, chest pain, heavy bleeding, fever with a very low white count, or sudden bruising you cannot explain.',
    questions: [
      'Which CBC values are outside the usual range, and what might that mean?',
      'Do I need more tests, or is watchful waiting appropriate?',
      'Could medicines, diet, or a recent illness explain this result?',
      'When should we repeat the CBC?',
    ],
  },
  {
    id: 'mri',
    keywords: ['mri', 'magnetic resonance', 'imaging study'],
    title: 'MRI scan',
    category: 'test',
    summary:
      'An MRI uses magnets and radio waves, not X-rays, to create detailed pictures of organs, joints, or the brain. It can help explain pain, neurologic symptoms, or unclear findings from other tests.',
    explanation:
      'You lie still in a tunnel-like scanner while it makes loud tapping sounds. Some studies use contrast dye through a vein to highlight certain tissues. Because of the strong magnet, metal implants, pacemakers, aneurysm clips, and some devices must be reviewed in advance. The scan itself is painless, but staying still can be uncomfortable. A radiologist interprets the images and sends a report to the ordering clinician.',
    keyPoints: [
      'Tell staff about implants, metal, pregnancy, kidney disease, or claustrophobia before the scan.',
      'An MRI finding is one piece of information, not a diagnosis by itself.',
      'Incidental findings are common and may not need treatment.',
      'Ask how and when you will get results, not only that the scan was completed.',
    ],
    whenToSeekCare:
      'Call the imaging center if you develop hives, trouble breathing, or severe dizziness after contrast. New weakness, seizure, or worst-ever headache needs emergency care.',
    questions: [
      'What question is this MRI meant to answer?',
      'Do I need contrast, and are there kidney or allergy concerns?',
      'How should I prepare, and can I take my usual medicines?',
      'Who will explain the report to me, and when?',
    ],
  },
  {
    id: 'metformin',
    keywords: ['metformin', 'glucophage', 'diabetes medicine', 'diabetes medication'],
    title: 'Metformin',
    category: 'medication',
    summary:
      'Metformin is a common first medicine for type 2 diabetes. It helps the liver release less sugar and helps the body use insulin more effectively.',
    explanation:
      'Metformin does not usually cause low blood sugar on its own. Stomach upset, loose stools, or a metallic taste can happen when starting or increasing the dose; taking it with food and using extended-release forms can help some people. Rarely, it is linked to lactic acidosis, especially with severe kidney problems, dehydration, or certain procedures that use contrast dye. Your clinician may pause it around some surgeries or imaging studies.',
    keyPoints: [
      'It works best as part of a broader glucose plan, not as a stand-alone fix.',
      'Kidney function is checked because dosing depends on it.',
      'Vitamin B12 levels may be monitored during long-term use.',
      'Never start, stop, or double a dose based on an app or internet article.',
    ],
    whenToSeekCare:
      'Contact a clinician for severe vomiting, unusual muscle pain, trouble breathing, or illness that prevents you from eating or drinking. Emergency care is needed for those symptoms plus extreme fatigue or confusion.',
    questions: [
      'Is metformin still the right medicine for my A1C and kidney function?',
      'What side effects should I expect in the first two weeks?',
      'Should I hold this medicine before any upcoming scan or procedure?',
      'What other diabetes treatments might we add if this is not enough?',
    ],
  },
  {
    id: 'lisinopril',
    keywords: ['lisinopril', 'ace inhibitor', 'blood pressure medicine', 'blood pressure medication'],
    title: 'Lisinopril',
    category: 'medication',
    summary:
      'Lisinopril is an ACE inhibitor used for high blood pressure, some heart conditions, and kidney protection in certain people with diabetes.',
    explanation:
      'It relaxes blood vessels so the heart does not have to pump as hard. A dry cough is a well-known side effect for some people. Dizziness can happen if blood pressure drops, especially after the first doses or if you are dehydrated. Your clinician usually checks kidney function and potassium after starting or changing the dose. It is generally not used during pregnancy.',
    keyPoints: [
      'Take it consistently; skipped doses can make home readings bounce.',
      'Report swelling of the lips, tongue, or face immediately.',
      'Dehydration from illness can affect kidneys while on this medicine.',
      'Do not combine with extra potassium supplements unless your clinician agrees.',
    ],
    whenToSeekCare:
      'Seek emergency care for facial or tongue swelling, trouble breathing, fainting, or a severe allergic-type reaction.',
    questions: [
      'What home blood pressure range means this dose is working?',
      'When will we recheck kidney labs and potassium?',
      'If I get a cough, what are the alternatives?',
      'Which of my other medicines or OTC products could interact?',
    ],
  },
  {
    id: 'anxiety',
    keywords: ['anxiety', 'panic', 'worry', 'generalized anxiety', 'gad', 'panic attack'],
    title: 'Anxiety',
    category: 'condition',
    summary:
      'Anxiety is the body and mind staying on high alert. It can show up as racing thoughts, muscle tension, poor sleep, restlessness, or physical symptoms such as a fast heartbeat.',
    explanation:
      'A short burst of anxiety can be useful before a real threat. When it stays switched on, everyday tasks feel harder than they should. Clinicians look at how long symptoms have lasted, how much they interfere with life, and whether there is depression, trauma, thyroid issues, or substance use in the mix. Helpful options can include therapy, breathing and sleep routines, reducing caffeine, and sometimes medicine. Feeling anxious about a medical visit is also common and worth mentioning to the care team.',
    keyPoints: [
      'Physical symptoms of anxiety can mimic heart or breathing problems.',
      'You do not have to wait until symptoms are severe to ask for help.',
      'Therapy and skills practice are treatments, not just “talking it out.”',
      'If you take medicine, ask about expected timeline and possible side effects.',
    ],
    whenToSeekCare:
      'Get urgent help for chest pain, fainting, or thoughts of self-harm. If anxiety is stopping you from eating, sleeping, working, or leaving home, contact your clinician or a crisis line.',
    questions: [
      'Could a medical issue or medicine be adding to these symptoms?',
      'Would counseling, medicine, or both make sense as a first step?',
      'What should I track before our next visit?',
      'What is a safe plan if symptoms spike between appointments?',
    ],
  },
  {
    id: 'asthma',
    keywords: ['asthma', 'inhaler', 'wheeze', 'albuterol', 'rescue inhaler'],
    title: 'Asthma',
    category: 'condition',
    summary:
      'Asthma is a condition where the airways become swollen and tight at times, making it harder to move air. Triggers can include viruses, allergies, smoke, exercise, or weather changes.',
    explanation:
      'People with asthma may notice wheezing, chest tightness, cough, or shortness of breath. Care often includes a rescue inhaler for sudden symptoms and, for many people, a daily controller inhaler that reduces airway inflammation. Technique matters: medicine that stays in the mouth does not help the lungs. An asthma action plan tells you which medicines to use when symptoms are green, yellow, or red.',
    keyPoints: [
      'Needing a rescue inhaler more often is a signal to review the plan.',
      'Spacer devices can improve how much medicine reaches the lungs.',
      'Colds can make asthma worse even if day-to-day control is usually good.',
      'Smoking and vaping make control much harder.',
    ],
    whenToSeekCare:
      'Seek emergency care if you cannot speak full sentences, lips look blue, rescue medicine is not helping, or you feel you cannot get enough air.',
    questions: [
      'Is my current inhaler plan still the right one?',
      'Can you watch my inhaler technique?',
      'What does my action plan say I should do during a flare?',
      'Do I need allergy testing, a controller change, or a peak-flow meter?',
    ],
  },
  {
    id: 'colonoscopy',
    keywords: ['colonoscopy', 'colon cancer screening', 'polyp', 'bowel prep'],
    title: 'Colonoscopy',
    category: 'appointment',
    summary:
      'A colonoscopy lets a clinician look at the inside of the colon with a thin camera. It can find polyps, bleeding sources, or other changes and is a common screening test.',
    explanation:
      'The most important (and least popular) part is the bowel prep: clearing the colon so the camera has a clear view. You will get diet instructions and a laxative plan. During the procedure you usually receive sedation, so you will need a ride home. If polyps are removed, you may get a timeline for when to repeat the exam. Results can include “normal,” polyps that were removed, or findings that need follow-up.',
    keyPoints: [
      'Follow the prep instructions closely; an incomplete prep can mean repeating the test.',
      'Tell the team about blood thinners, diabetes medicines, and all supplements.',
      'Arrange a responsible adult to take you home if sedation is used.',
      'Ask how biopsy or polyp results will be shared.',
    ],
    whenToSeekCare:
      'After the procedure, seek urgent care for severe abdominal pain, fever, heavy bleeding, or dizziness. Before the procedure, call if you cannot finish the prep or vomit the solution.',
    questions: [
      'How should I adjust my medicines, including blood thinners, before the prep?',
      'What can I have besides clear liquids, and when do I stop drinking?',
      'What happens if a polyp is found?',
      'When and how will I get the final results?',
    ],
  },
  {
    id: 'mammogram',
    keywords: ['mammogram', 'breast screening', 'breast imaging', 'tomosynthesis'],
    title: 'Mammogram',
    category: 'test',
    summary:
      'A mammogram is an X-ray of the breast used to look for changes that may not be felt on exam. It is a screening tool, not a cancer diagnosis by itself.',
    explanation:
      'Each breast is compressed for a few seconds to spread tissue and get a clearer picture. Some people feel pressure or brief pain. 3D mammography (tomosynthesis) takes layered images and can help in denser breasts. A callback for extra pictures is common and usually does not mean cancer. Your report may mention breast density, which can affect how screening is planned.',
    keyPoints: [
      'Bring prior images if you changed clinics so radiologists can compare.',
      'Avoid deodorant or powder the day of the exam if your center requests it.',
      'A callback is a request for more information, not a diagnosis.',
      'Ask when and how results will be communicated.',
    ],
    whenToSeekCare:
      'Do not wait for a screening appointment if you notice a new lump, nipple discharge, skin dimpling, or a sudden change in breast shape. Contact your clinician promptly.',
    questions: [
      'Based on my age and risk, how often should I be screened?',
      'Do I have dense breasts, and does that change the plan?',
      'If I am called back, what extra tests are typical?',
      'Are there family-history or genetic questions we should review?',
    ],
  },
  {
    id: 'thyroid',
    keywords: ['thyroid', 'tsh', 'hypothyroid', 'hyperthyroid', 'levothyroxine', 'hashimoto'],
    title: 'Thyroid tests and thyroid conditions',
    category: 'condition',
    summary:
      'The thyroid is a small gland in the neck that helps set the body’s energy, temperature, and heart-rate pace. Blood tests such as TSH help show if it is underactive or overactive.',
    explanation:
      'When the thyroid is underactive (hypothyroidism), people may notice fatigue, cold intolerance, constipation, dry skin, or low mood. When it is overactive, they may notice a fast heartbeat, heat intolerance, weight loss, or anxiety-like symptoms. TSH is often the first test; free T4 and sometimes antibodies are added. Treatment, if needed, is individualized. Levothyroxine is a common replacement hormone and is usually taken on an empty stomach, separate from some supplements.',
    keyPoints: [
      'Symptoms overlap with many other conditions, so labs matter.',
      'Dose changes are usually based on blood tests plus how you feel.',
      'Calcium, iron, and some foods can interfere with absorption of thyroid pills.',
      'Pregnancy and major weight changes often require a plan review.',
    ],
    whenToSeekCare:
      'Seek urgent care for a very fast or irregular heartbeat, severe agitation, or extreme sleepiness and low temperature. Otherwise, bring a symptom list to a scheduled visit.',
    questions: [
      'Which thyroid labs were done, and what do they show?',
      'Do I need treatment now, or is observation enough?',
      'How should I take thyroid medicine around food and vitamins?',
      'When should we repeat labs after a dose change?',
    ],
  },
  {
    id: 'gerd',
    keywords: ['gerd', 'reflux', 'heartburn', 'acid reflux', 'ppi', 'omeprazole'],
    title: 'Acid reflux (GERD)',
    category: 'condition',
    summary:
      'GERD happens when stomach contents flow back into the esophagus, causing heartburn, regurgitation, or a sour taste. Some people also notice cough or throat irritation.',
    explanation:
      'A valve at the bottom of the esophagus is meant to keep food and acid down. If it relaxes too often, acid can irritate the lining. Large meals, late eating, alcohol, smoking, extra abdominal pressure, and some foods can make this worse. Care may include meal timing, raising the head of the bed, and medicines that reduce acid. Chest pain should never be assumed to be reflux until a clinician has considered heart causes.',
    keyPoints: [
      'Not all chest burning is reflux; new or exertional chest pain needs urgent evaluation.',
      'Long-term acid-reducing medicines have benefits and tradeoffs to review.',
      'Weight, meal size, and bedtime timing often matter as much as trigger foods.',
      'Trouble swallowing or unintentional weight loss deserves prompt attention.',
    ],
    whenToSeekCare:
      'Call emergency services for chest pain, pressure, or shortness of breath. Contact a clinician soon for trouble swallowing, black stools, vomiting blood, or ongoing vomiting.',
    questions: [
      'How can we tell this is reflux and not something else?',
      'Should I try lifestyle changes first, or start a medicine?',
      'How long is it safe for me to stay on an acid-reducing medicine?',
      'Do I need an endoscopy or any testing?',
    ],
  },
  {
    id: 'uti',
    keywords: ['uti', 'urinary tract infection', 'bladder infection', 'burning urine', 'cystitis'],
    title: 'Urinary tract infection (UTI)',
    category: 'condition',
    summary:
      'A UTI is an infection in the urinary system, most often the bladder. Typical symptoms include burning with urination, urgency, frequency, and sometimes pelvic discomfort.',
    explanation:
      'Bacteria, commonly from the digestive tract, can travel into the urethra and bladder. A urine test can support the diagnosis and guide antibiotics when needed. Not every burning or frequent urination episode is a UTI; irritation, dehydration, and some vaginal conditions can feel similar. Kidney involvement may cause fever, back or flank pain, and illness that feels more systemic.',
    keyPoints: [
      'Finish prescribed antibiotics unless your clinician tells you to stop.',
      'Phenazopyridine can ease burning but does not treat the infection.',
      'Recurrent UTIs deserve a prevention conversation, not endless leftover pills.',
      'Fever and back pain are not typical for a simple bladder infection.',
    ],
    whenToSeekCare:
      'Seek prompt care for fever, shaking chills, vomiting, flank pain, confusion, or symptoms in pregnancy. Contact a clinician if symptoms start after procedures or catheters.',
    questions: [
      'Do I need a urine culture, or is a dipstick enough this time?',
      'Which antibiotic is recommended and for how many days?',
      'What should I do if symptoms are not better in 48 hours?',
      'How can we reduce the chance this comes back?',
    ],
  },
  {
    id: 'migraine',
    keywords: ['migraine', 'aura'],
    title: 'Migraine',
    category: 'condition',
    summary:
      'Migraine is a neurologic condition that can cause moderate to severe headache, often with nausea, light sensitivity, or sound sensitivity. Some people get warning symptoms called aura.',
    explanation:
      'Migraine is more than “a bad headache.” Brain pathways involved in pain, sensory processing, and sometimes blood vessels become temporarily more reactive. Triggers vary: sleep change, hormones, dehydration, skipped meals, stress letdown, or certain foods. Treatment can include a plan for attacks (what to take early) and, if attacks are frequent, a prevention plan. New sudden “worst headache of my life” is a different emergency until proven otherwise.',
    keyPoints: [
      'Taking some pain medicines too many days a month can cause rebound headache.',
      'A headache diary can reveal patterns better than memory alone.',
      'Nausea treatment can be as important as pain treatment.',
      'Red-flag headaches need urgent in-person evaluation.',
    ],
    whenToSeekCare:
      'Seek emergency care for sudden severe headache, headache with fever and stiff neck, weakness, vision loss, confusion, or head injury. Contact your clinician if attacks are increasing or medicines stop working.',
    questions: [
      'Is this migraine, tension-type headache, or something we should rule out?',
      'What should I take at the first sign of an attack?',
      'Would a prevention medicine or device be reasonable?',
      'Which warning signs mean I should go to urgent or emergency care?',
    ],
  },
  {
    id: 'annual-physical',
    keywords: ['annual physical', 'checkup', 'wellness visit', 'preventive visit', 'physical exam'],
    title: 'Annual physical or wellness visit',
    category: 'appointment',
    summary:
      'A wellness visit is a planned check-in to review prevention, medicines, vaccines, screening tests, and concerns that are easy to forget during sick visits.',
    explanation:
      'These visits are usually not the best time for every complex problem, but they are an excellent time to set priorities. The clinician may review blood pressure, weight, mental health, alcohol or tobacco use, and which screenings are due. Bring a medicine list, pharmacy name, and your top two or three questions. Labs are not automatic for every adult; they depend on age, conditions, and guidelines.',
    keyPoints: [
      'Write down concerns in advance so the visit does not get hijacked by one issue.',
      'Bring home readings, such as blood pressure or glucose, if you track them.',
      'Ask which vaccines and screenings are due this year.',
      'Clarify what follow-up you should expect after any labs.',
    ],
    whenToSeekCare:
      'Do not wait for a physical if you have chest pain, trouble breathing, fainting, severe depression, or rapidly worsening symptoms.',
    questions: [
      'What screenings and vaccines are due for me this year?',
      'Which of my medicines still match my current conditions?',
      'What lifestyle change would you prioritize first?',
      'What should I schedule before I leave today?',
    ],
  },
  {
    id: 'depression',
    keywords: ['depression', 'low mood', 'ssri', 'antidepressant'],
    title: 'Depression',
    category: 'condition',
    summary:
      'Depression is more than a brief sad mood. It can affect energy, sleep, appetite, concentration, interest in usual activities, and the way a person thinks about the future.',
    explanation:
      'Clinicians look at how long symptoms have lasted and how much they interfere with daily life. Medical issues, medicines, grief, substance use, and anxiety can overlap. Treatment may include therapy, medicine, sleep and activity support, and a safety plan. Antidepressants, when used, often take several weeks to show benefit and should not be stopped suddenly without guidance.',
    keyPoints: [
      'Asking for help is a medical step, not a personal failure.',
      'Sleep, alcohol, and isolation can quietly worsen symptoms.',
      'Follow-up after starting treatment is important for safety and dose review.',
      'If you have thoughts of self-harm, tell someone immediately and seek urgent help.',
    ],
    whenToSeekCare:
      'If you are thinking about suicide or cannot stay safe, call 988 in the U.S. or local emergency services. Contact a clinician if mood, sleep, or functioning is getting worse.',
    questions: [
      'What treatment options fit my symptoms and preferences?',
      'How will we know if a medicine or therapy is helping?',
      'Are any of my current medicines or health conditions contributing?',
      'What is the plan if I feel worse before I feel better?',
    ],
  },
];

export function findKnowledgeMatches(text, extra = '') {
  const topic = (text || '').toLowerCase();
  const context = (extra || '').toLowerCase();
  const scored = knowledgeBase
    .map((entry) => {
      const topicHits = entry.keywords.filter((keyword) => topic.includes(keyword)).length;
      const contextHits = entry.keywords.filter((keyword) => context.includes(keyword)).length;
      return {
        entry,
        score: topicHits * 5 + contextHits,
        topicHits,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.topicHits - a.topicHits);

  return scored.map((item) => item.entry);
}
