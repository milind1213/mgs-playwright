import { NavigationPage } from "../Common/HomePage"
const MENU = require('../../../constants/menuNames');
const config = require("../../../environmentConfig");

exports.LoginSignupPage = class LoginSignupPage {
  constructor(page) {
    this.page = page;
    // Login
    this.loginTitleLabel = page.locator('h2', { hasText: 'Login to your account' });
    this.loginEmailTextBox = page.locator('[data-qa="login-email"]');
    this.loginPasswordTextBox = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.logoutLink = page.locator('a[href="/logout"]');


    // Signup
    this.signupTitleLabel = page.locator('h2', { hasText: 'New User Signup!' });
    this.signupNameTextBox = page.locator('[data-qa="signup-name"]');
    this.signupEmailTextBox = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.successSignUpMessage = page.locator('h2[data-qa="account-created"]');
    // Separator
    this.orLabel = page.locator('h2.or');
    this.errorMessageLocator = page.locator('p:has-text("Your email or password is incorrect!")');

    //SignUp Locators
    this.titleMrRadio = page.locator('input#id_gender1');
    this.titleMrsRadio = page.locator('input#id_gender2');
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.signUppasswordInput = page.locator('input[data-qa="password"]');
    this.daySelect = page.locator('select[data-qa="days"]');
    this.monthSelect = page.locator('select[data-qa="months"]');
    this.yearSelect = page.locator('select[data-qa="years"]');
    this.newsletterCheckbox = page.locator('input#newsletter');
    this.optinCheckbox = page.locator('input#optin');
    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.companyInput = page.locator('input[data-qa="company"]');
    this.address1Input = page.locator('input[data-qa="address"]');
    this.address2Input = page.locator('input[data-qa="address2"]');
    this.countrySelect = page.locator('select[data-qa="country"]');
    this.stateInput = page.locator('input[data-qa="state"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
  }

  async login(page, userDetails) {
    const navigationPage = new NavigationPage(page);
    try {
      console.log("Launching application at:", config.baseUrl);
      await page.goto(config.baseUrl);

      console.log("Navigating to:", MENU.LOGIN);
      await navigationPage.navigateTo(MENU.LOGIN);

      if (!userDetails.email || !userDetails.password) {
        throw new Error("Email or Password is missing in userDetails.");
      }

      console.log("Filling in login credentials...");
      console.log("Email:", userDetails.email);
      await this.loginEmailTextBox.fill(userDetails.email);

      console.log("Password: ********");
      await this.loginPasswordTextBox.fill(userDetails.password);

      console.log("Clicking Login button...");
      await this.loginButton.click();
    } catch (error) {
      console.error("Login failed with error:", error.message);
      throw error;
    }
  }

  async register(page, userDetails) {
    const navigationPage = new NavigationPage(page);

    try {
      console.log("Launching application for registration at:", config.baseUrl);
      await page.goto(config.baseUrl, { waitUntil: 'domcontentloaded' });

      console.log("Navigating to:", MENU.LOGIN);
      await navigationPage.navigateTo(MENU.LOGIN);

      console.log("Filling Signup Name and Email...");
      await this.signupNameTextBox.fill(userDetails.name);
      await this.signupEmailTextBox.fill(userDetails.email);
      await this.signupButton.click();

      console.log("Filling user details for account creation...");
      if (userDetails.title?.toLowerCase() === 'mr') {
        await this.titleMrRadio.check();
      } else if (userDetails.title?.toLowerCase() === 'mrs') {
        await this.titleMrsRadio.check();
      }

      await this.signUppasswordInput.fill(userDetails.password);
      await this.firstNameInput.fill(userDetails.firstName);
      await this.lastNameInput.fill(userDetails.lastName);
      await this.address1Input.fill(userDetails.address1);
      await this.countrySelect.selectOption(userDetails.country);
      await this.stateInput.fill(userDetails.state);
      await this.cityInput.fill(userDetails.city);
      await this.zipcodeInput.fill(userDetails.zipcode);
      await this.mobileNumberInput.fill(userDetails.mobileNumber);

      console.log("Submitting registration form...");
      await this.createAccountButton.click();

      await this.successSignUpMessage.waitFor({ state: 'visible', timeout: 10000 });
      console.log("User registration completed.");

    } catch (error) {
      console.error("Registration failed:", error.message);
      throw error;
    }
  }

  async loginOrRegister(page, userDetails) {
    try {
      await this.login(page, userDetails);
      const isErrorVisible = await this.errorMessageLocator.isVisible({ timeout: 5000 });

      if (isErrorVisible) {
        console.warn("Login failed. Proceeding with registration...");
        await this.register(page, userDetails);
      } else {
        console.log("Login successful.");
      }
    } catch (error) {
      console.error("Login or registration process failed:", error.message);
      throw error;
    }
  }

}