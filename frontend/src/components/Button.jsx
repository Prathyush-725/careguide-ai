export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  loading = false,
  ...props
}) {
  return (
    <button className={`btn btn-${variant}`} type={type} disabled={loading || props.disabled} {...props}>
      {loading ? 'Working…' : children}
    </button>
  );
}
