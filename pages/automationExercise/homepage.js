export class NavigationPage {
  constructor(page) {
    this.page = page;

    this.testCasesButton = page.locator('button:has-text("Test Cases")');
    this.apiListButton = page.locator('button:has-text("APIs list for practice")');
    this.nextCarouselArrow = page.locator('a.right.control-carousel.hidden-xs[data-slide="next"]');
    this.prevCarouselArrow = page.locator('a.left.control-carousel.hidden-xs[data-slide="prev"]');

    this.menulinks = {
      home: page.locator('a[href="/"]'),
      products: page.locator('a[href="/products"]'),
      cart: page.locator('a[href="/view_cart"]'),
      login: page.locator('a[href="/login"]'),
      testcases: page.locator('a[href="/test_cases"]'),
      api: page.locator('a[href="/api_list"]'),
      videos: page.locator('a[href="https://www.youtube.com/c/AutomationExercise"]'),
      contact: page.locator('a[href="/contact_us"]'),
    };
  }

  async navigateTo(menuName) {
    const locator = this.menulinks[menuName.toLowerCase()];
    if (!locator) {
      throw new Error(`Menu "${menuName}" not found in navigation.`);
    }
    console.log(`Navigating to menu: ${menuName}`);
    await locator.click();
  }
}
