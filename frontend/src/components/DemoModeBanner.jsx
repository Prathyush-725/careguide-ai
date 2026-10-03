export default function DemoModeBanner() {
  if (!import.meta.env.PROD) return null;

  return (
    <aside className="banner demo-banner" role="note">
      <strong>Public educational demo. </strong>
      This site is not authenticated. Profile and history use generic, temporary sample data and may reset at any time. Do not enter real names, emails, or personal health information. CareGuide is not suitable for patient records or PHI.
    </aside>
  );
}
