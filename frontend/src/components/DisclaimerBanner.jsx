export default function DisclaimerBanner({ compact = false }) {
  return (
    <aside className="banner" role="note">
      <strong>Educational information only. </strong>
      {compact
        ? 'CareGuide AI does not diagnose, treat, or replace advice from a licensed clinician.'
        : 'CareGuide AI can help you understand health topics and prepare for visits, but it is not a diagnosis, treatment plan, or substitute for professional medical advice. If you have an emergency, call your local emergency number.'}
    </aside>
  );
}
