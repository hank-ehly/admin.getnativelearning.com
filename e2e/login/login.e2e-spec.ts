/**
 * login.e2e-spec
 * admin.get-native.com
 *
 * Created by henryehly on 2017/05/30.
 */

import { browser } from 'protractor';

import { LoginPage } from './login.po';

describe('admin.get-native.com/login', () => {
    let page: LoginPage;

    beforeEach(async () => {
        page = new LoginPage();
        await page.navigateTo();
    });

    afterEach(async () => {
        browser.executeScript('window.localStorage.clear();');
    });

    it('should disable the login button by default', () => {
        expect(page.loginButton.isEnabled()).toBe(false);
    });

    it('should enable the login button after both form fields are filled out', () => {
        page.emailInput.sendKeys('test@email.com');
        page.passwordInput.sendKeys('password');
        expect(page.loginButton.isEnabled()).toBe(true);
    });

    it('should disable the login button after form submission', async () => {
        page.emailInput.sendKeys('test@email.com');
        page.passwordInput.sendKeys('password');
        page.loginButton.click();
        expect(page.loginButton.isEnabled()).toBe(false);
    });

    it('should transition to the dashboard after successful login', async () => {
        page.emailInput.sendKeys('test@email.com');
        page.passwordInput.sendKeys('password');
        page.loginButton.click();
        expect(await browser.getCurrentUrl()).toMatch(/[0-9]*\/$/);
    });
});
