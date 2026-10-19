
import { Page } from '@playwright/test';


export class ProductPage{

    constructor(private page: Page){}


    private locators = {

        inventoryItems: '.inventory_item',
        cartBadge: '.shopping_cart_link',
        sortDropDown : '[data-test="product-sort-container"]',
        itemPrices: '.inventory_item_price',
        addToCartButton:(productName:string) =>`//div[text()='${productName}']/ancestor::div[@class='inventory_item']`,


    };

    async getProductCount() : Promise<number>
    {
        return await this.page.locator(this.locators.inventoryItems).count();

    }


    async addProductToCart(productName: string)
    {

        this.page.locator(this.locators.addToCartButton(productName));

    }


    async getCartBadgeCount() : Promise<string| null>
    {
        return await this.page.locator(this.locators.cartBadge).textContent();
    }



    async sortBy(option : string)
    {
        await this.page.locator(this.locators.sortDropDown).selectOption({label: option});
    }


    async getAllPrices() : Promise <number[]>
    {
        const allPricesTexts = await this.page.locator(this.locators.itemPrices).allTextContents();
        console.log("all Prices are ", allPricesTexts);
        return allPricesTexts.map(price=> parseFloat(price.replace('$','')));
    }
}