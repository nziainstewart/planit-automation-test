import { type Locator, type Page } from "@playwright/test";

export class ContactPage {
  private readonly page: Page;
  private readonly submitButton: Locator;
  private readonly inputForename: Locator;
  private readonly inputEmail: Locator;
  private readonly inputMessage: Locator;
  readonly errorForename: Locator;
  readonly errorEmail: Locator;
  readonly errorMessage: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.submitButton = page.locator('a[ui-event*="onSubmit"]');
    this.inputForename = page.locator("#forename");
    this.inputEmail = page.locator("#email");
    this.inputMessage = page.locator("#message");
    this.errorForename = page.locator("#forename-err");
    this.errorEmail = page.locator("#email-err");
    this.errorMessage = page.locator("#message-err");
    this.successAlert = page.locator(".alert-success");
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async populateFields(forename: string, email: string, message: string) {
    await this.inputForename.fill(forename);
    await this.inputEmail.fill(email);
    await this.inputMessage.fill(message);
  }
}
