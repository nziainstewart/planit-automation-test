import { test, expect } from "../fixtures/pageObjects";
import testdata from "../test-data/jupiter-test-data.json";

test.describe("Contact Form Submission", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  /*
     Test 2
    */
  test("Test case 2: Verify submission", async ({ contactPage, homePage }) => {
    await homePage.navigateTo("contact");
    const data = testdata.contactPageField;
    await contactPage.populateFields(data.Forename, data.Email, data.Message);
    await contactPage.clickSubmit();
    await expect(contactPage.successAlert).toBeVisible();
    await expect(contactPage.successAlert).toContainText(
      `Thanks ${data.Forename}, we appreciate your feedback`,
    );
  });
});
