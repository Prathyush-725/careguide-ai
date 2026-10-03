import { useEffect, useState } from 'react';
import Alert from '../components/Alert.jsx';
import Button from '../components/Button.jsx';
import DisclaimerBanner from '../components/DisclaimerBanner.jsx';
import Field from '../components/Field.jsx';
import ResultPanel from '../components/ResultPanel.jsx';
import Spinner from '../components/Spinner.jsx';
import { useForm } from '../hooks/useForm.js';
import { useSafeRequest } from '../hooks/useSafeRequest.js';
import { api } from '../services/api.js';

const suggestions = ['High blood pressure', 'A1C', 'Metformin', 'MRI', 'Colonoscopy', 'Anxiety'];

function validate(values) {
  const errors = {};
  if (!values.topic.trim() || values.topic.trim().length < 2) {
    errors.topic = 'Enter a topic, term, test, or medicine (at least 2 characters).';
  }
  if (values.topic.trim().length > 200) {
    errors.topic = 'Please keep the topic under 200 characters.';
  }
  if (values.context.length > 1500) {
    errors.context = 'Please keep extra context under 1,500 characters.';
  }
  return errors;
}

export default function Explainer() {
  const form = useForm({ topic: '', context: '' }, validate);
  const [topics, setTopics] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const run = useSafeRequest();

  useEffect(() => {
    run((signal) => api.getTopics({ signal }))
      .then((data) => {
        if (data?.topics) setTopics(data.topics);
      })
      .catch(() => {});
  }, [run]);

  async function onSubmit(event) {
    event.preventDefault();
    const { ok, values } = form.submit();
    if (!ok) return;
    setLoading(true);
    setError('');
    try {
      const data = await run((signal) => api.explain(values, { signal }));
      if (data) setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page">
      <div className="page-header">
        <h2>Health topic explainer</h2>
        <p className="lede">Type a diagnosis, symptom, lab, imaging test, or medication and get a calmer, simpler explanation.</p>
      </div>
      <DisclaimerBanner />
      <div className="split">
        <form className="form-card" onSubmit={onSubmit}>
          <Field
            label="What would you like explained?"
            name="topic"
            value={form.values.topic}
            onChange={form.handleChange}
            error={form.errors.topic}
            maxLength={200}
            placeholder="Example: type 2 diabetes, lipid panel, lisinopril"
            hint="Use the words from a portal message, after-visit summary, or prescription label."
          />
          <Field
            as="textarea"
            label="Optional context"
            name="context"
            value={form.values.context}
            onChange={form.handleChange}
            error={form.errors.context}
            maxLength={1500}
            placeholder="Example: My clinician mentioned this after my last blood test."
          />
          <div className="chips" style={{ marginBottom: 16 }}>
            {suggestions.map((item) => (
              <button key={item} className="chip" type="button" onClick={() => form.update('topic', item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="actions">
            <Button type="submit" loading={loading}>
              Explain in plain language
            </Button>
          </div>
          {loading ? <Spinner /> : null}
          <Alert>{error}</Alert>
        </form>
        {result ? (
          <ResultPanel result={result} />
        ) : (
          <article className="card">
            <h3>Topics the mock guide knows well</h3>
            <p className="muted">Any topic works. Unmatched topics stay general and do not invent a diagnosis.</p>
            <ul className="list">
              {topics.slice(0, 8).map((topic) => (
                <li key={topic.id}>{topic.title}</li>
              ))}
            </ul>
          </article>
        )}
      </div>
    </section>
  );
}
