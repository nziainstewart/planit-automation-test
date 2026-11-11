import { type Page } from "@playwright/test";

export class HomePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(section: "contact" | "shop" | "cart") {
    await this.page.locator(`#nav-${section}`).getByRole("link").click();
  }
}
