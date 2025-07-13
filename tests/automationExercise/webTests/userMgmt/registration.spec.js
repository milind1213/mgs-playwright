import { test, expect } from '@playwright/test';
import { LoginSignupPage } from '../../../../pages/automationExercise/User/LoginSignUpPage';

test.describe.serial('User Registration Tests', () => {
    test('Should register a new user successfully', async ({ page }) => {
        const loginSignupPage = new LoginSignupPage(page);
        const uniqueEmail = `testuser_${Date.now()}@example.com`; 
        
        const userDetails = {
            name: 'Test User',
            email: uniqueEmail,
            password: 'Test@1234',
            title: 'Mr',
            firstName: 'Test',
            lastName: 'User',
            address1: '123 Main St',
            country: 'Canada',
            state: 'Ontario',
            city: 'Toronto',
            zipcode: 'M1A1A1',
            mobileNumber: '1234567890'
        };

        await loginSignupPage.register(page, userDetails);
        await expect(loginSignupPage.successSignUpMessage).toBeVisible();
        await expect(loginSignupPage.successSignUpMessage).toHaveText('Account Created!');
    });
});

