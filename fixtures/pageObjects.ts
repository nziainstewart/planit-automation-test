import { test as base } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { ContactPage } from "../pages/contactPage";
import { ShopPage } from "../pages/shopPage";
import { ShoppingCartPage } from "../pages/shoppingCartPage";

type MyFixtures = {
  homePage: HomePage;
  contactPage: ContactPage;
  shopPage: ShopPage;
  shoppingCartPage: ShoppingCartPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  shopPage: async ({ page }, use) => {
    await use(new ShopPage(page));
  },
  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },
});

export { expect } from "@playwright/test";
