import { test, expect } from '@playwright/test';

test('GET /api/user/101', async ({ request }) => {
  const res = await request.get('http://localhost:8081/api/user/101');
  expect(res.status()).toBe(200);
  const body = await res.json();
  console.log('Full Response:\n', JSON.stringify(body, null, 2));
  expect(body).toHaveProperty('id', 101);

  expect(body).toHaveProperty('address.geo', {lat: 18.5204, lng: 73.8567});
  expect(body).toHaveProperty('preferences.notifications.push.quietHours.start', '22:00');
  expect(body).toHaveProperty('metadata.createdAt', '2024-07-26T10:30:00Z');
  expect(body).toHaveProperty('metadata.loginHistory[0].device', 'Chrome on Windows');
  expect(body).toHaveProperty('permissions.dashboard', true); 
  expect(body).toHaveProperty('permissions.settings', false);
  expect(body).toHaveProperty('roles', ['admin', 'editor', 'support']);
  expect(body).toHaveProperty('preferences.theme', 'dark');
  expect(body).toHaveProperty('preferences.language', 'en-IN');
  expect(body).toHaveProperty('metadata.status', 'active'); 
  expect(body.name).toBe('Milind Ghongade');
});


test('POST /api/user', async ({ request }) => {
  const res = await request.post('http://localhost:8081/api/user', {
    data: { name: 'Milind' },
    headers: { 'Content-Type': 'application/json' }
  });
  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(body.message).toBe('User created');
});

test('DELETE /api/user/101', async ({ request }) => {
  const res = await request.delete('http://localhost:8080/api/user/101');
  expect(res.status()).toBe(204);
});
