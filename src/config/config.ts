import { TIMEOUT } from 'dns';
import * as dotenv from 'dotenv';
import * as path from 'path';

//load the environment specific .env files
const enviroment = process.env.ENV || 'default';//ENV=qa npx cucumber-js --dry-run --format summary
                                                //OR ($env:ENV="qa" npx cucumber-js --format summary)
                                                //npx cucumber-js src/features/login.feature
const envFile = enviroment === 'default'? '.env' :`.env.${enviroment}`;//.env.qa 

dotenv.config({path: path.resolve(process.cwd(),envFile)});

export const config = {

   baseUrl:  process.env.BASE_URL || 'https://www.saucedemo.com',
   headless: process.env.HEADLESS === 'true',
   browser: process.env.BROWSER || 'chromium',

   users:{

    standard: process.env.STANDARD_USER || 'standard_user',
    password: process.env.PASSWORD || 'secret_sauce'

   },
   
   timeout:{
      default: 30000,
      navigation: 60000


   }
}