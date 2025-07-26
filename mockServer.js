import { getLocal } from 'mockttp';
const server = getLocal();

async function startMockServer() {
  await server.start(8080);

  await server.forGet('/api/user/101').thenReply(
    200,
    JSON.stringify({
      id: 101,
      name: 'Milind',
      email: 'milind@example.com',
      address: {
        street: '123 Test St',
        city: 'Pune',
        zip: '411001'
      },
      roles: ['admin', 'editor'],
      preferences: {
        notifications: {
          email: true,
          sms: false
        },
        theme: 'dark'
      }
    }),
    { 'Content-Type': 'application/json' }
  );

  await server.forPost('/api/user').withBody({ name: 'Milind' }).thenReply(
    201,
    JSON.stringify({ message: 'User created' }),
    { 'Content-Type': 'application/json' }
  );

  await server.forDelete('/api/user/101').thenReply(204);
  console.log('✅ Mock server is running on http://localhost:8080');
}

startMockServer();
