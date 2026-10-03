export function notFound(_req, res) {
  res.status(404).json({
    error: 'Not found',
    message: 'The requested resource does not exist.',
  });
}

export function errorHandler(err, _req, res, _next) {
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'invalid_json',
      message: 'The request body was not valid JSON.',
    });
  }

  if (err?.type === 'entity.too.large') {
    return res.status(413).json({
      error: 'payload_too_large',
      message: 'That request is too large. Please shorten the text and try again.',
    });
  }

  const status = Number(err.status) || 500;
  const safeClientError = err.expose || status < 500;
  const message = safeClientError
    ? err.message || 'Please check your request and try again.'
    : 'An unexpected error occurred. Please try again.';

  if (status >= 500) {
    console.error('[CareGuide]', err.message || err);
  }

  res.status(status).json({
    error: err.code || (status < 500 ? 'request_error' : 'server_error'),
    message,
    details: Array.isArray(err.details) ? err.details : undefined,
  });
}

export function createHttpError(status, message, details, code) {
  const error = new Error(message);
  error.status = status;
  error.expose = true;
  error.details = details;
  error.code = code || 'request_error';
  return error;
}
