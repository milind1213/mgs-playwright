import { LoginSignupPage } from "./loginSignUp.js";
import { NavigationPage } from "./HomePage.js";
import { ProductDetailPage } from "./productDetails.js";
import { ProductListPage } from "./productList.js";
import { ProductReviewPage } from "./productReview.js";
import { CheckoutPage } from "./checkout.js";
import { SubscriptionPage } from "./subscription.js";
import { ContactUsPage } from "./contactUs.js";

export class POMDashboard {
  constructor(page) {
    this.page = page;
    this.loginSignupPage = new LoginSignupPage(page);
    this.productDetailPage = new ProductDetailPage(page);
    this.productListPage = new ProductListPage(page);
    this.productReviewPage = new ProductReviewPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.subscriptionPage = new SubscriptionPage(page);
    this.contactUsPage = new ContactUsPage(page);
    this.cartPage = new CheckoutPage(page);
  }

  getCartPage() {
    return this.cartPage;
  }
  getContactUsPage() {
    return this.contactUsPage;
  }

  getLoginSignupPage() {
    return this.loginSignupPage;
  }

  getProductDetailPage() {
    return this.productDetailPage;
  }

  getProductListPage() {
    return this.productListPage;
  }

  getProductReviewPage() {
    return this.productReviewPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getSubscriptionPage() {
    return this.subscriptionPage;
  }
}
