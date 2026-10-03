const API_URL = import.meta.env.VITE_API_URL || '/api';

export class ApiError extends Error {
  constructor(message, { aborted = false } = {}) {
    super(message);
    this.name = aborted ? 'AbortError' : 'ApiError';
    this.aborted = aborted;
  }
}

export function isAbortError(error) {
  return Boolean(error?.aborted || error?.name === 'AbortError');
}

async function request(path, options = {}) {
  const { signal, ...rest } = options;
  const headers = {
    'Content-Type': 'application/json',
    ...(rest.headers || {}),
  };

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, { ...rest, headers, signal });
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new ApiError('Request cancelled.', { aborted: true });
    }
    throw new ApiError('Unable to reach CareGuide AI. Please try again in a moment.');
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const details = Array.isArray(data.details) ? ` ${data.details.join(' ')}` : '';
    throw new ApiError((data.message || 'Something went wrong.') + details);
  }
  return data;
}

export const api = {
  getDashboard: (options) => request('/dashboard', options),
  explain: (payload, options) => request('/explain', { method: 'POST', body: JSON.stringify(payload), ...options }),
  getTopics: (options) => request('/explain/topics', options),
  prepareAppointment: (payload, options) =>
    request('/appointments', { method: 'POST', body: JSON.stringify(payload), ...options }),
  generateQuestions: (payload, options) =>
    request('/questions', { method: 'POST', body: JSON.stringify(payload), ...options }),
  getHistory: (options) => request('/history', options),
  getHistoryItem: (id, options) => request(`/history/${encodeURIComponent(id)}`, options),
  deleteHistory: (id, options) => request(`/history/${encodeURIComponent(id)}`, { method: 'DELETE', ...options }),
  getProfile: (options) => request('/profile', options),
  saveProfile: (payload, options) => request('/profile', { method: 'PUT', body: JSON.stringify(payload), ...options }),
};
