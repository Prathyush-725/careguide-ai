import { Link } from 'react-router-dom';
import { historyLabels } from '../models/labels.js';

function formatDate(value) {
  return new Date(value).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function HistoryCard({ item, onDelete }) {
  return (
    <div className="history-item">
      <Link to={`/history/${item.id}`}>
        <p className="badge">{historyLabels[item.type] || item.type}</p>
        <h3>{item.title}</h3>
        <p className="muted">{item.preview}</p>
        <small className="muted">{formatDate(item.createdAt)}</small>
      </Link>
      {onDelete ? (
        <button className="btn btn-danger" type="button" onClick={() => onDelete(item.id)}>
          Remove
        </button>
      ) : null}
    </div>
  );
}
