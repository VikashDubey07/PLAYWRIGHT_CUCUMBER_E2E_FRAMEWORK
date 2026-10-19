import { Given,When,Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { CustomWorld } from "../support/world";
import { ProductPage } from "../pages/productPage";
import { config } from "../config/config";


let loginpage : LoginPage
let productpage: ProductPage


Given('user is logged in with valid credentials', async function (this: CustomWorld) {
    loginpage = new LoginPage(this.page)
    productpage = new ProductPage(this.page)

    await loginpage.navigate();
    await loginpage.enterUserName(config.users.standard);
    await loginpage.enterPassword(config.users.password);
    await loginpage.clickLogin();
 
});

Then('user snoulde able to see the atleast one product on the page', async function (this: CustomWorld) {
    const count  = await productpage.getProductCount();
    expect(count).toBeGreaterThanOrEqual(1);

  
});

When('user add :{string} to the cart', async function (this: CustomWorld, productName: string) {
    await productpage.addProductToCart(productName);
  
});

Then('the cart badge should show {string} item', async function (this: CustomWorld, expectedCount: string) {

    const actulaBadgeCount  = await productpage.getCartBadgeCount();
    expect(actulaBadgeCount).toBe(expectedCount);
  
});

When('user sort products by {string}', async function (this: CustomWorld, sortingOption: string) {

    await productpage.sortBy(sortingOption);
  
});

Then('the first product price should be lowest', async function (this: CustomWorld) {
    const prices: number[] = await productpage.getAllPrices();

  
});