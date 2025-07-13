import { test, expect }  from'@playwright/test';
import { POMDashboard } from '../../../pages/automationExercise/POMDashboard';
import { log } from '../../../utils/logger';


test.describe.serial('Login Tests', () => {
    test('Should login successfully with valid credentials', async ({ page }) => {
        const dashboard = new POMDashboard(page);
        const userDetails = {
            email: 'mgs@g.com',
            password: 'mgs@123'
        };
        await dashboard.getLoginSignupPage().login(page, userDetails);
        await expect(dashboard.getLoginSignupPage().logoutLink).toBeVisible();
        await expect(dashboard.getLoginSignupPage().logoutLink).toHaveText('Logout');
        log(`User logged in successfully with email: ${userDetails.email}`);

    });

    test('Should show error for invalid credentials', async ({ page }) => {
        const dashboard = new POMDashboard(page);
        const invalidUser = {
            email: 'invaliduser@example.com',
            password: 'wrongpassword'
        };

        await dashboard.getLoginSignupPage().login(page, invalidUser);
        await expect(dashboard.getLoginSignupPage().errorMessageLocator).toBeVisible();
        await expect(dashboard.getLoginSignupPage().errorMessageLocator).toHaveText('Your email or password is incorrect!');
        log(`Login failed for email: ${invalidUser.email}`);
    });
});
