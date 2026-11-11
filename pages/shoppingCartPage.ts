import { type Locator, type Page } from "@playwright/test";

export class ShoppingCartPage {
  private readonly page: Page;
  private readonly totalText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.totalText = page.getByText(/Total:/);
  }

  //prettier-ignore
  private convertPriceStringToNumber(text: string): number {
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getToyRow(toyName: string) {
    const row = this.page.locator("tr").filter({ hasText: toyName });
    const price = await row.locator("td").nth(1).innerText();
    const subTotal = await row.locator("td").nth(3).innerText();
    const quantity = await row.locator("input.input-mini").inputValue();
    return {
      price: this.convertPriceStringToNumber(price),
      quantity: parseInt(quantity || "0", 10),
      subTotal: this.convertPriceStringToNumber(subTotal),
    };
  }

  async getCartTotal(): Promise<number> {
    const pageTotal = await this.totalText.innerText();
    return this.convertPriceStringToNumber(pageTotal);
  }
}
