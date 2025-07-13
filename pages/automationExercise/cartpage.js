export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItemsContainer = page.locator('div.cart-items');
    this.cartItem = (itemName) => page.locator('div.cart-item', { hasText: itemName });
    this.proceedToCheckoutButton = page.locator('button.proceed-to-checkout');
  }

  async getCartItems() {
    const items = await this.cartItemsContainer.locator('div.cart-item').allTextContents();
    return items;
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}