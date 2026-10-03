import { useState } from 'react';
import Alert from '../components/Alert.jsx';
import Button from '../components/Button.jsx';
import DisclaimerBanner from '../components/DisclaimerBanner.jsx';
import Field from '../components/Field.jsx';
import ResultPanel from '../components/ResultPanel.jsx';
import Spinner from '../components/Spinner.jsx';
import { useForm } from '../hooks/useForm.js';
import { useSafeRequest } from '../hooks/useSafeRequest.js';
import { api } from '../services/api.js';

function validate(values) {
  const errors = {};
  if (!values.topic.trim() || values.topic.trim().length < 2) {
    errors.topic = 'Enter the topic you want questions about.';
  }
  if (values.topic.trim().length > 200) {
    errors.topic = 'Please keep the topic under 200 characters.';
  }
  if (values.visitGoal.length > 400) {
    errors.visitGoal = 'Please keep the visit goal under 400 characters.';
  }
  return errors;
}

export default function Questions() {
  const form = useForm({ topic: '', visitGoal: '', audience: 'patient' }, validate);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [copyError, setCopyError] = useState('');
  const [loading, setLoading] = useState(false);
  const run = useSafeRequest();

  async function onSubmit(event) {
    event.preventDefault();
    const { ok, values } = form.submit();
    if (!ok) return;
    setLoading(true);
    setError('');
    setCopied(false);
    setCopyError('');
    try {
      const data = await run((signal) => api.generateQuestions(values, { signal }));
      if (data) setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function copyList() {
    if (!result?.printable?.length) {
      setCopyError('Generate a question list before copying.');
      return;
    }
    const text = result.printable.map((item, index) => `${index + 1}. ${item}`).join('\n');
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('clipboard unavailable');
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopyError('');
    } catch {
      setCopied(false);
      setCopyError('Could not copy to the clipboard. You can still select the questions on the page and copy them manually.');
    }
  }

  return (
    <section className="page">
      <div className="page-header">
        <h2>Questions for my provider</h2>
        <p className="lede">Create a short, respectful question list you can print, copy, or read from your phone.</p>
      </div>
      <DisclaimerBanner />
      <div className="split">
        <form className="form-card" onSubmit={onSubmit}>
          <Field
            label="Topic or concern"
            name="topic"
            value={form.values.topic}
            onChange={form.handleChange}
            error={form.errors.topic}
            maxLength={200}
            placeholder="Example: starting a statin, thyroid results, asthma flare"
          />
          <Field
            label="Goal for the conversation"
            name="visitGoal"
            value={form.values.visitGoal}
            onChange={form.handleChange}
            error={form.errors.visitGoal}
            maxLength={400}
            placeholder="Example: understand whether I need a medicine change"
          />
          <Field
            as="select"
            label="Who is asking?"
            name="audience"
            value={form.values.audience}
            onChange={form.handleChange}
          >
            <option value="patient">I am the patient</option>
            <option value="caregiver">I am a caregiver or support person</option>
          </Field>
          <div className="actions">
            <Button type="submit" loading={loading}>
              Generate questions
            </Button>
          </div>
          {loading ? <Spinner label="Writing useful questions…" /> : null}
          <Alert>{error}</Alert>
        </form>
        {result ? (
          <ResultPanel
            result={result}
            extra={
              <div className="actions" style={{ marginTop: 12 }}>
                <Button variant="ghost" onClick={copyList}>
                  {copied ? 'Copied' : 'Copy question list'}
                </Button>
                <Alert>{copyError}</Alert>
              </div>
            }
          />
        ) : (
          <article className="card">
            <h3>Make the visit two-way</h3>
            <p>Good questions help you leave with a plan you can repeat in your own words: what it is, why it matters, what happens next, and when to call.</p>
          </article>
        )}
      </div>
    </section>
  );
}
