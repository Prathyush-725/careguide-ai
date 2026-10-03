import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DisclaimerBanner from '../components/DisclaimerBanner.jsx';
import Alert from '../components/Alert.jsx';
import Spinner from '../components/Spinner.jsx';
import { api } from '../services/api.js';
import { useSafeRequest } from '../hooks/useSafeRequest.js';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const run = useSafeRequest();

  useEffect(() => {
    setLoading(true);
    run((signal) => api.getDashboard({ signal }))
      .then((payload) => {
        if (!payload) return;
        setData(payload);
        setError('');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [run]);

  return (
    <section className="page">
      <div className="page-header hero">
        <h2>{data?.greeting || 'Welcome to CareGuide AI'}</h2>
        <p className="lede">
          Prepare for appointments with plain-language explanations and a short list of questions worth asking.
        </p>
      </div>
      <DisclaimerBanner />
      {data?.reminderPreference ? <aside className="banner">{data.reminderPreference}</aside> : null}
      {loading ? <Spinner label="Loading your dashboard…" /> : null}
      <Alert>{error}</Alert>

      {data ? (
        <>
          <div className="stats">
            <div className="stat">
              <strong>{data.stats.totalSaved}</strong>
              Saved items
            </div>
            <div className="stat">
              <strong>{data.stats.explanations}</strong>
              Explanations
            </div>
            <div className="stat">
              <strong>{data.stats.questionSets + data.stats.appointments}</strong>
              Visit plans
            </div>
          </div>

          <div className="grid-3" style={{ marginTop: 20 }}>
            {data.shortcuts.map((item) => (
              <Link className="shortcut" key={item.to} to={item.to}>
                <h3>{item.title}</h3>
                <p className="muted">{item.description}</p>
              </Link>
            ))}
          </div>

          <article className="card" style={{ marginTop: 20 }}>
            <h3>Recent saved guidance</h3>
            {data.stats.recent.length === 0 ? (
              <p className="muted">Nothing saved yet. Start with a topic, visit plan, or question list.</p>
            ) : (
              data.stats.recent.map((item) => (
                <Link className="history-item" key={item.id} to={`/history/${item.id}`}>
                  <div>
                    <span className="badge">{item.type}</span>
                    <h4>{item.title}</h4>
                    <p className="muted">{item.preview}</p>
                  </div>
                </Link>
              ))
            )}
          </article>
        </>
      ) : null}
    </section>
  );
}
