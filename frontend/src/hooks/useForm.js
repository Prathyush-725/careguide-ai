import { useState } from 'react';

export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function update(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    update(name, type === 'checkbox' ? checked : value);
  }

  function submit() {
    const nextErrors = validate ? validate(values) : {};
    setErrors(nextErrors);
    return { ok: Object.keys(nextErrors).length === 0, values, errors: nextErrors };
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
  }

  return { values, errors, setValues, update, handleChange, submit, reset };
}
