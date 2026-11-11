import { type Page } from "@playwright/test";

export class ShopPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async buyToy(toyName: string, toyQuantity: number) {
    const toyCell = this.page.locator(".product").filter({ hasText: toyName });
    const clickBuy = toyCell.getByRole("link", { name: "Buy" });

    for (let i = 0; i < toyQuantity; i++) {
      await clickBuy.click();
    }
  }
}
