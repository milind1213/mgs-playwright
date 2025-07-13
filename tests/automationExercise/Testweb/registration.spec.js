import { test, expect } from '@playwright/test';
import { POMDashboard } from '../../../pages/automationExercise/POMDashboard';

test.describe.serial('User Registration Tests', () => {
    test('Should register a new user successfully', async ({ page }) => {
       const dashboard = new POMDashboard(page);
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

        await dashboard.getLoginSignupPage().register(page, userDetails);
        await expect(dashboard.getLoginSignupPage().successSignUpMessage).toBeVisible();
        await expect(dashboard.getLoginSignupPage().successSignUpMessage).toHaveText('Account Created!');
    });
});

