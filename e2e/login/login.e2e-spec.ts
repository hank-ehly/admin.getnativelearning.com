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
        await browser.executeScript('window.localStorage.clear();');
    });

    it('should disable the login button by default', async () => {
        expect(await page.loginButton.isEnabled()).toBe(false);
    });

    it('should enable the login button after both form fields are filled out', async () => {
        await page.emailInput.sendKeys('admin@email.com');
        await page.passwordInput.sendKeys('password');
        expect(await page.loginButton.isEnabled()).toBe(true);
    });

    it('should transition to the dashboard after successful login', async () => {
        await page.emailInput.sendKeys('admin@email.com');
        await page.passwordInput.sendKeys('password');
        await page.loginButton.click();
        expect(await browser.getCurrentUrl()).toMatch(/[0-9]*\/$/);
    });
});
