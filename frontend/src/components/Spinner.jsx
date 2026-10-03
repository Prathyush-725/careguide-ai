export default function Spinner({ label = 'Preparing a plain-language response…' }) {
  return (
    <div className="loading-row" role="status" aria-live="polite">
      <div className="spinner" />
      <span>{label}</span>
    </div>
  );
}
