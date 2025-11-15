import type { Page } from '@playwright/test';
import { STANDARD_USER_STORAGE_STATE } from '../../../playwright.config';
import LoginPage from '../../../pages/loginPage';
import {
  standard_user_email,
  standard_user_password,
} from '../obtainCredential';
import { pathUrls } from '../pathUrls';

export async function loginStandardUser(page: Page): Promise<void> {
  const email = standard_user_email();
  const password = standard_user_password();

  if (!email || !password) {
    throw new Error('Email or password is undefined');
  }

  const loginPage = new LoginPage(page);

  await page.goto(process.env.UI_BASE_URL || 'https://www.saucedemo.com/');

  await loginPage.fillLoginForm(email, password);
  await loginPage.clickLoginButton();
  await page.waitForURL(pathUrls.sauceDemo.inventory().toString());

  await page.context().storageState({ path: STANDARD_USER_STORAGE_STATE });
}
