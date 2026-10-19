
import {Page} from '@playwright/test';
import { config } from '../config/config';

export class LoginPage{

    constructor(private page: Page) { }

    private locators = {
        userName: '#user-name',
        password: '#password',
        loginButton: '#login-button',
        inventory:'#inventory_container',
        errorMessage: 'h3[data-test="error"]'
    };

    async  navigate()
    {
        await this.page.goto(config.baseUrl,{waitUntil:'load'});
    }


    async enterUserName(userName: string)
    {
        await this.page.locator(this.locators.userName).fill(userName);
    }


     async enterPassword(password: string)
    {
        await this.page.locator(this.locators.password).fill(password);
    }


    async clickLogin()
    {
        await this.page.locator(this.locators.loginButton).click();
    }


    async isInventoryVisible():  Promise<boolean>
    {
        return await this.page.locator(this.locators.inventory).first().isVisible();
    }


    async getErrorMessage():  Promise<string | null>
    {
        return await this.page.locator(this.locators.errorMessage).textContent();
    }



}