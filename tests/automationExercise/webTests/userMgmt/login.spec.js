import { test, expect }  from'@playwright/test';
import { LoginSignupPage } from '../../../../pages/automationExercise/User/LoginSignUpPage.js';

test.describe.serial('Login Tests', () => {
    test('Should login successfully with valid credentials', async ({ page }) => {
        const loginSignupPage = new LoginSignupPage(page);
        const userDetails = {
            email: 'mgs@g.com',
            password: 'mgs@123'
        };
        await loginSignupPage.login(page, userDetails);
        await expect(loginSignupPage.logoutLink).toBeVisible();
        await expect( loginSignupPage.logoutLink).toBeVisible();
    });

    test('Should show error for invalid credentials', async ({ page }) => {
        const loginSignupPage = new LoginSignupPage(page);
        const invalidUser = {
            email: 'invaliduser@example.com',
            password: 'wrongpassword'
        };

        await loginSignupPage.login(page, invalidUser);
        await expect(loginSignupPage.errorMessageLocator).toBeVisible();
    });
});
