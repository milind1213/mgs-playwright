import { test, expect } from '@playwright/test';
import config from '../../../../config/configEnvirment';
import { END_POINTS } from '../../../../config/constants';


test('API 7: POST Verify Login with valid details - should return 200 and success message', async ({ request }) => {
    const apiUrl = `${config.baseUrl}${END_POINTS.VERIFY_LOGIN}`;
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
    
    const responseBody = await response.json()
    console.log(`Response: ${JSON.stringify(responseBody)}`);

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('User exists!');
});
