import type { User } from '../../../shared/types/user';

const USER_API_BASE = '/api/user';
const AUTH_API_BASE = '/api/auth';

export async function getUserIfLoggedIn(): Promise<User | null> {
  const authRes = await fetch(`${AUTH_API_BASE}/check-auth`, {
    method: 'GET',
    credentials: 'include'
  });
  const authData = await authRes.json();
  if (!authRes.ok) {
    throw new Error('Failed to check authentication: ' + authData.message);
  }
  if (!authData.authenticated) return null;

  const userRes = await fetch(`${USER_API_BASE}/me`, {
    method: 'GET',
    credentials: 'include'
  });
  const userData = await userRes.json();
  if (!userRes.ok) {
    throw new Error('Failed to fetch user: ' + userData.message);
  }
  return userData;
}