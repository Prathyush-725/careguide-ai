import { Link } from 'react-router-dom';

export default function EmptyState({ title, body, to, action }) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      <p>{body}</p>
      {to ? (
        <Link className="btn btn-primary" to={to}>
          {action}
        </Link>
      ) : null}
    </div>
  );
}
