import { useEffect, useState } from 'react';
import Alert from '../components/Alert.jsx';
import EmptyState from '../components/EmptyState.jsx';
import HistoryCard from '../components/HistoryCard.jsx';
import Spinner from '../components/Spinner.jsx';
import { api } from '../services/api.js';
import { useSafeRequest } from '../hooks/useSafeRequest.js';

export default function History() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const run = useSafeRequest();

  async function load() {
    setLoading(true);
    try {
      const data = await run((signal) => api.getHistory({ signal }));
      if (data) {
        setItems(data.items || []);
        setError('');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // load is stable enough for first mount via run().
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  async function onDelete(id) {
    try {
      const result = await run((signal) => api.deleteHistory(id, { signal }));
      if (result) {
        setItems((current) => current.filter((item) => item.id !== id));
        setError('');
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="page">
      <div className="page-header">
        <h2>Saved history</h2>
        <p className="lede">
          Reopen explanations, visit plans, and question lists from this demo. Items are temporary educational notes, not a medical record.
        </p>
      </div>
      <Alert>{error}</Alert>
      {loading ? <Spinner label="Loading saved items…" /> : null}
      {!loading && items.length === 0 && !error ? (
        <EmptyState
          title="No saved guidance yet"
          body="Generate an explanation or visit plan and it will appear here if history is enabled in your profile."
          to="/explain"
          action="Explain a topic"
        />
      ) : null}
      {!loading && items.length > 0 ? (
        <div className="card">
          {items.map((item) => (
            <HistoryCard key={item.id} item={item} onDelete={onDelete} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
