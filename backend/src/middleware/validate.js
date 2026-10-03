import { createHttpError } from './errorHandler.js';

export function validateBody(schema) {
  return (req, _res, next) => {
    const errors = [];

    for (const [field, rules] of Object.entries(schema)) {
      const value = req.body?.[field];
      const label = rules.label || field;

      if (rules.required && (value === undefined || value === null || value === '')) {
        errors.push(`${label} is required.`);
        continue;
      }

      if (value === undefined || value === null || value === '') {
        continue;
      }

      if (rules.type === 'string' && typeof value !== 'string') {
        errors.push(`${label} must be text.`);
        continue;
      }

      if (rules.type === 'array' && !Array.isArray(value)) {
        errors.push(`${label} must be a list.`);
        continue;
      }

      if (rules.type === 'boolean' && typeof value !== 'boolean' && typeof value !== 'string') {
        errors.push(`${label} must be yes or no.`);
        continue;
      }

      if (typeof value === 'string') {
        const trimmed = value.trim();
        if (rules.minLength && trimmed.length < rules.minLength) {
          errors.push(`${label} must be at least ${rules.minLength} characters.`);
        }
        if (rules.maxLength && trimmed.length > rules.maxLength) {
          errors.push(`${label} must be ${rules.maxLength} characters or fewer.`);
        }
        if (rules.enum && !rules.enum.includes(trimmed)) {
          errors.push(`${label} is not a supported option.`);
        }
      }
    }

    if (errors.length) {
      return next(createHttpError(400, 'Please correct the highlighted fields.', errors, 'validation_error'));
    }

    next();
  };
}
