import { Given,When,Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CustomWorld } from '../support/world';


let loginPage: LoginPage;


Given('user is on login page', async function (this: CustomWorld) {
  

    loginPage = new LoginPage(this.page);
    await loginPage.navigate();
});

When('user enter username {string}', async function (this: CustomWorld, userName: string) {
    await loginPage.enterUserName(userName);
 
});

When('user enter password {string}', async function (this: CustomWorld, password: string) {
   await loginPage.enterPassword(password);
});

When('user click on login button', async function () {
  await loginPage.clickLogin();
});

Then('user should be able to see Inventory page', async function (this: CustomWorld) {
    const isVisible = await loginPage.isInventoryVisible();
    expect(isVisible).toBe(false);

});

Then('user should be able to see error message {string}', async function (this: CustomWorld, ExpectederrorMessage: string) {
    const actualErrorMessage = await loginPage.getErrorMessage();
    expect(actualErrorMessage).toContain(ExpectederrorMessage);

});


Then('user should be able to see success result {string}', async function (this: CustomWorld, result: string) {
  
        const ErrorMessage = await loginPage.getErrorMessage();
        expect(ErrorMessage).toContain(result);
});