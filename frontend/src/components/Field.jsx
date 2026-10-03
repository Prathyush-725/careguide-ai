export default function Field({
  label,
  name,
  hint,
  error,
  as = 'input',
  children,
  ...props
}) {
  const Control = as;
  return (
    <label className={`field ${error ? 'error' : ''}`}>
      <span className="field-label">{label}</span>
      {as === 'select' ? (
        <select id={name} name={name} {...props}>
          {children}
        </select>
      ) : (
        <Control id={name} name={name} {...props} />
      )}
      {hint && !error ? <small>{hint}</small> : null}
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}
