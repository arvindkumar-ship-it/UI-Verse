const BASE_URL = import.meta.env.VITE_API_URL;

let accessToken = null;

export function setAccessToken(token) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

async function refreshAccessToken() {
  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  if (!response.ok) {
    setAccessToken(null);
    return null;
  }

  const data = await response.json();
  setAccessToken(data.accessToken);
  return data.accessToken;
}

async function request(path, { method = 'GET', body, isRetry = false } = {}) {
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials: 'include',
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401 && !isRetry) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      return request(path, { method, body, isRetry: true });
    }
  }

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : null;

  if (!response.ok) {
    const error = new Error(data?.message || `Request failed: ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  delete: (path) => request(path, { method: 'DELETE' }),
};

export async function uploadToPresignedUrl(uploadUrl, file) {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!response.ok) {
    throw new Error('File upload failed');
  }
}