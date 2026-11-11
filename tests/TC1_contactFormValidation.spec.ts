import { test, expect } from "../fixtures/pageObjects";
import testdata from "../test-data/jupiter-test-data.json";

test.describe("Contact form validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  /*
     Test 1
    */
  test("Test case 1: Verify contact page fields validation messages", async ({
    contactPage,
    homePage,
  }) => {
    await homePage.navigateTo("contact");
    await contactPage.clickSubmit();
    //await contactPage.verifyErrorMessagesShow();

    await expect(contactPage.errorForename).toContainText(
      "Forename is required",
    );
    await expect(contactPage.errorEmail).toContainText("Email is required");
    await expect(contactPage.errorMessage).toContainText("Message is required");

    const data = testdata.contactPageField;
    await contactPage.populateFields(data.Forename, data.Email, data.Message);

    await test.step("errors are gone", async () => {
      await expect(contactPage.errorForename).toBeHidden();
      await expect(contactPage.errorEmail).toBeHidden();
      await expect(contactPage.errorMessage).toBeHidden();
    });
  });
});
