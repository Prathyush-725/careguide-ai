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
  if (!values.appointmentType) errors.appointmentType = 'Choose the kind of visit.';
  if (!values.reason.trim() || values.reason.trim().length < 3) {
    errors.reason = 'Tell us the main reason for the visit.';
  }
  if (values.reason.trim().length > 240) {
    errors.reason = 'Please keep the visit reason under 240 characters.';
  }
  if (values.concerns.length > 1500) {
    errors.concerns = 'Please keep concerns under 1,500 characters.';
  }
  if (values.medications.length > 800) {
    errors.medications = 'Please keep medications under 800 characters.';
  }
  if (values.goals.length > 400) {
    errors.goals = 'Please keep the visit goal under 400 characters.';
  }
  return errors;
}

export default function AppointmentPrep() {
  const form = useForm(
    {
      appointmentType: 'follow-up',
      reason: '',
      concerns: '',
      medications: '',
      goals: '',
    },
    validate,
  );
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const run = useSafeRequest();

  async function onSubmit(event) {
    event.preventDefault();
    const { ok, values } = form.submit();
    if (!ok) return;
    setLoading(true);
    setError('');
    try {
      const data = await run((signal) => api.prepareAppointment(values, { signal }));
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
        <h2>Appointment preparation</h2>
        <p className="lede">Walk in with a checklist, a sense of what may happen, and questions that fit the visit.</p>
      </div>
      <DisclaimerBanner />
      <div className="split">
        <form className="form-card" onSubmit={onSubmit}>
          <Field
            as="select"
            label="Visit type"
            name="appointmentType"
            value={form.values.appointmentType}
            onChange={form.handleChange}
            error={form.errors.appointmentType}
          >
            <option value="annual-physical">Annual physical / wellness</option>
            <option value="follow-up">Follow-up</option>
            <option value="specialist">Specialist</option>
            <option value="diagnostic">Diagnostic or testing visit</option>
            <option value="new-patient">New-patient visit</option>
            <option value="telehealth">Telehealth</option>
            <option value="urgent">Urgent or same-week visit</option>
          </Field>
          <Field
            label="Main reason"
            name="reason"
            value={form.values.reason}
            onChange={form.handleChange}
            error={form.errors.reason}
            maxLength={240}
            placeholder="Example: review my blood pressure and new dizziness"
          />
          <Field
            as="textarea"
            label="What is worrying you?"
            name="concerns"
            value={form.values.concerns}
            onChange={form.handleChange}
            error={form.errors.concerns}
            maxLength={1500}
            placeholder="Symptoms, test results, or something you did not understand last time."
          />
          <Field
            label="Medicines or allergies to mention"
            name="medications"
            value={form.values.medications}
            onChange={form.handleChange}
            error={form.errors.medications}
            maxLength={800}
            placeholder="Optional"
          />
          <Field
            label="What would a successful visit look like?"
            name="goals"
            value={form.values.goals}
            onChange={form.handleChange}
            error={form.errors.goals}
            maxLength={400}
            placeholder="Example: leave with a home monitoring plan"
          />
          <div className="actions">
            <Button type="submit" loading={loading}>
              Build my visit plan
            </Button>
          </div>
          {loading ? <Spinner label="Building a visit plan…" /> : null}
          <Alert>{error}</Alert>
        </form>
        {result ? (
          <ResultPanel result={result} />
        ) : (
          <article className="card">
            <h3>Tip</h3>
            <p>Name the visit type and the one problem you most want addressed. A focused reason produces a more useful checklist.</p>
          </article>
        )}
      </div>
    </section>
  );
}
