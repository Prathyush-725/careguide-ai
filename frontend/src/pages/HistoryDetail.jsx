import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Alert from '../components/Alert.jsx';
import Button from '../components/Button.jsx';
import ResultPanel from '../components/ResultPanel.jsx';
import Spinner from '../components/Spinner.jsx';
import { api } from '../services/api.js';
import { useSafeRequest } from '../hooks/useSafeRequest.js';

export default function HistoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const run = useSafeRequest();

  useEffect(() => {
    setItem(null);
    setLoading(true);
    run((signal) => api.getHistoryItem(id, { signal }))
      .then((data) => {
        if (!data) return;
        setItem(data);
        setError('');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, run]);

  async function remove() {
    try {
      const result = await run((signal) => api.deleteHistory(id, { signal }));
      if (result) navigate('/history');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="page">
      <Link to="/history">← Back to history</Link>
      {loading ? <Spinner label="Opening saved guidance…" /> : null}
      <Alert>{error}</Alert>
      {item ? (
        <>
          <div className="page-header">
            <p className="badge">{item.type}</p>
            <h2>{item.title}</h2>
            <p className="muted">Saved {new Date(item.createdAt).toLocaleString()}</p>
          </div>
          <ResultPanel result={item.result} />
          <div className="actions" style={{ marginTop: 16 }}>
            <Button variant="danger" onClick={remove}>
              Delete this item
            </Button>
          </div>
        </>
      ) : null}
    </section>
  );
}
