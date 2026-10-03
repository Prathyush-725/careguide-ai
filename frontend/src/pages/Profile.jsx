import { useEffect, useState } from 'react';
import Alert from '../components/Alert.jsx';
import Button from '../components/Button.jsx';
import Field from '../components/Field.jsx';
import Spinner from '../components/Spinner.jsx';
import { useForm } from '../hooks/useForm.js';
import { useSafeRequest } from '../hooks/useSafeRequest.js';
import { api } from '../services/api.js';
import { PROFILE_LIMITS, validateProfile } from '../utils/validation.js';

export default function Profile() {
  const form = useForm(
    {
      name: '',
      preferredName: '',
      email: '',
      role: 'patient',
      language: 'en',
      careFocus: '',
      notes: '',
      appointmentReminders: true,
      saveHistory: true,
    },
    validateProfile,
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const run = useSafeRequest();

  useEffect(() => {
    run((signal) => api.getProfile({ signal }))
      .then((data) => {
        if (!data) return;
        form.setValues({
          name: data.name || '',
          preferredName: data.preferredName || '',
          email: data.email || '',
          role: data.role || 'patient',
          language: data.language || 'en',
          careFocus: data.careFocus || '',
          notes: data.notes || '',
          appointmentReminders: Boolean(data.appointmentReminders),
          saveHistory: data.saveHistory !== false,
        });
        setError('');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    // Load once when the request helper is ready.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  async function onSubmit(event) {
    event.preventDefault();
    const { ok, values } = form.submit();
    if (!ok) return;
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const saved = await run((signal) =>
        api.saveProfile(
          {
            ...values,
            appointmentReminders: Boolean(values.appointmentReminders),
            saveHistory: Boolean(values.saveHistory),
          },
          { signal },
        ),
      );
      if (saved) {
        form.setValues({
          ...saved,
          appointmentReminders: Boolean(saved.appointmentReminders),
          saveHistory: saved.saveHistory !== false,
        });
        setSuccess('Profile updated. Preferences are stored on this device only.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page">
      <div className="profile-hero">
        <h2>Your profile</h2>
        <p>
          This demo profile personalizes greetings and whether new guidance is saved. It is not a medical record.
          Do not enter real patient data, and leave email blank on any public deployment.
        </p>
      </div>
      {loading ? <Spinner label="Loading profile…" /> : null}
      {!loading ? (
        <form className="form-card" style={{ marginTop: 20 }} onSubmit={onSubmit}>
          <div className="grid-2">
            <Field
              label="Full name"
              name="name"
              value={form.values.name}
              onChange={form.handleChange}
              error={form.errors.name}
              maxLength={PROFILE_LIMITS.name.max}
            />
            <Field
              label="Preferred name"
              name="preferredName"
              value={form.values.preferredName}
              onChange={form.handleChange}
              error={form.errors.preferredName}
              maxLength={PROFILE_LIMITS.preferredName.max}
            />
            <Field
              label="Email (optional, stored only on this device)"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              error={form.errors.email}
              maxLength={PROFILE_LIMITS.email.max}
              hint="Not used for login, email, or sharing. Leave blank if you do not want it stored."
            />
            <Field as="select" label="I am using CareGuide as" name="role" value={form.values.role} onChange={form.handleChange} error={form.errors.role}>
              <option value="patient">Patient</option>
              <option value="caregiver">Caregiver</option>
              <option value="staff">Clinic staff</option>
            </Field>
            <Field
              label="Care focus"
              name="careFocus"
              value={form.values.careFocus}
              onChange={form.handleChange}
              error={form.errors.careFocus}
              maxLength={PROFILE_LIMITS.careFocus.max}
              placeholder="Example: diabetes and blood pressure"
            />
            <Field as="select" label="Language preference" name="language" value={form.values.language} onChange={form.handleChange} error={form.errors.language}>
              <option value="en">English</option>
              <option value="es">Spanish (display preference)</option>
            </Field>
          </div>
          <Field
            as="textarea"
            label="How do you like information explained?"
            name="notes"
            value={form.values.notes}
            onChange={form.handleChange}
            error={form.errors.notes}
            maxLength={PROFILE_LIMITS.notes.max}
          />
          <label className="toggle">
            <input
              type="checkbox"
              name="saveHistory"
              checked={form.values.saveHistory}
              onChange={form.handleChange}
            />
            Save explanations and visit plans in local history
          </label>
          <label className="toggle" style={{ margin: '10px 0 8px' }}>
            <input
              type="checkbox"
              name="appointmentReminders"
              checked={form.values.appointmentReminders}
              onChange={form.handleChange}
            />
            Remember that I like appointment-prep checklists
          </label>
          <p className="muted">
            This is a saved preference only. CareGuide does not send email, text, or calendar reminders.
          </p>
          <div className="actions" style={{ marginTop: 16 }}>
            <Button type="submit" loading={saving}>
              Save profile
            </Button>
          </div>
          <Alert>{error}</Alert>
          <Alert type="success">{success}</Alert>
        </form>
      ) : null}
    </section>
  );
}
