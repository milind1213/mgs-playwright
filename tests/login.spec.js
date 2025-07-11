import { test, expect } from '@playwright/test';
import { loginAndGetToken, getUserProfile } from '../utils/api-utils';

test('Login and fetch user details', async () => {
  const baseURL = 'https://your-api-url.com';
  const username = 'testuser';
  const password = 'testpass';

  const token = await loginAndGetToken(baseURL, username, password);
  expect(token).toBeTruthy();

  const user = await getUserProfile(baseURL, token);
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('username', username);
  
});
