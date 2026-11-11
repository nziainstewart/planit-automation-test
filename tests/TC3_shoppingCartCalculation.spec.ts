import { test, expect } from "../fixtures/pageObjects";
import testdata from "../test-data/jupiter-test-data.json";

test.describe("Shopping Cart Calculations", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  /*
     Test 3
    */
  test("Test case 3: Verify cart calculations", async ({
    homePage,
    shopPage,
    shoppingCartPage,
  }) => {
    await homePage.navigateTo("shop");
    const toys = testdata.shoppingCart.toysToBuy;
    for (const toy of toys) {
      await shopPage.buyToy(toy.toyName, toy.toyQuantity);
    }

    await homePage.navigateTo("cart");
    let calcTotalSum = 0;
    for (const toy of toys) {
      const rowSubTotal = await shoppingCartPage.getToyRow(toy.toyName);
      calcTotalSum += rowSubTotal.subTotal;

      expect(
        rowSubTotal.price,
        `Verify that the price for [${toy.toyName}] [${rowSubTotal.price}] matches the test data [${toy.toyPrice}]`,
      ).toBeCloseTo(toy.toyPrice, 2);

      expect(
        rowSubTotal.quantity,
        `Verify that the quantity for [${toy.toyName}] [${rowSubTotal.quantity}] matches the test data [${toy.toyQuantity}]`,
      ).toBe(toy.toyQuantity);

      const actualSubTotal = rowSubTotal.subTotal;
      const expectedSubTotal = toy.toyPrice * toy.toyQuantity;

      expect(
        actualSubTotal,
        `Verify that the subtotal for [${toy.toyName}] [${rowSubTotal.subTotal}] equals price * quantity [${expectedSubTotal}]`,
      ).toBe(toy.toyPrice * toy.toyQuantity);
    }
    const actualTotal = await shoppingCartPage.getCartTotal();

    expect(
      actualTotal,
      `Verify that the cart total [${actualTotal}] is the sum of all the sub totals [${calcTotalSum}]`,
    ).toBe(calcTotalSum);
  });
});
