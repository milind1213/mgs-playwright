import { test, expect } from '@playwright/test';
import config from '../../../../configEnvirment';
import EndPoints from '../../../../constants/apiEndpoints';


test('API 7: POST Verify Login with valid details - should return 200 and success message', async ({ request }) => {
    const apiUrl = `${config.baseUrl}${EndPoints.VERIFY_LOGIN}`;

    const requestBody = {
        email: 'mgs@g.com',
        password: 'mgs@123'
    };

    const response = await request.post(apiUrl, {
        json: requestBody,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('Response:', JSON.stringify(responseBody, null, 2));

    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('User exists!');
});
