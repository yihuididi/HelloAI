const API_BASE = '/api/auth';

export async function register(
  email: string,
  username: string,
  password: string,
  passwordConfirmation: string
) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email, username, password, passwordConfirmation })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error('Registration failed: ' + data.message);
  }

  return await login(email, password);
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error('Login failed: ' + data.message);
  }

  return data;
}

export async function logout() {
  const res = await fetch(`${API_BASE}/logout`, {
    method: 'POST',
    credentials: 'include'
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error('Logout failed: ' + data.message);
  }

  return data;
}