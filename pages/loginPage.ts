import {Page} from "@playwright/test";

export default class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public get usernameInput() {
        return this.page.locator('#user-name');
    }

    public get passwordInput() {
        return this.page.locator('#password');
    }

    public get loginButton() {
        return this.page.locator('#login-button');
    }

    public async fillLoginForm(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    public async clickLoginButton() {
        await this.loginButton.click();
    }
}