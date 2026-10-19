import { Before,After, BeforeStep,AfterStep,BeforeAll,AfterAll, ITestCaseHookParameter, Status } from "@cucumber/cucumber";
import { CustomWorld } from "./world";
import { Browser, chromium, firefox, webkit } from "playwright";
import { config } from "../config/config";


let browser: Browser;


BeforeAll(async function() {

    console.log("Browser from config:", config.browser);
    console.log("Headless:", config.headless);

    console.log("ENV =", process.env.ENV);
    console.log("CONFIG =", config);

    switch (config.browser.toLocaleLowerCase().trim())
    {

        case 'msedge':
            browser = await chromium.launch({channel:'msedge',headless: config.headless})
            break;
        // case 'webkit':
        //     browser = await webkit.launch({headless: config.headless})
        //     break;
        default:
            browser = await chromium.launch({channel:'chrome',headless: config.headless})
            break;
    }

 //browser = await chromium.launch({channel:'chrome', headless:false});

});

Before(async function(this: CustomWorld){

   this.context =  await browser.newContext();
   this.page = await this.context.newPage();

});

After(async function(this: CustomWorld,scenario: ITestCaseHookParameter){

    if(scenario.result?.status === Status.FAILED)
    {
        const screenshot  = await this.page.screenshot();
        this.attach(screenshot,'image/png');
    }
    await this.page.close();
    await this.context.close();
})

AfterAll(async function(){

    await browser.close();
})
