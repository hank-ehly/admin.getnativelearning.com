/**
 * categories.po
 * admin.get-native.com
 *
 * Created by henryehly on 2017/06/01.
 */

import { $$, browser } from 'protractor';

import { LoginPage } from '../login/login.po';

export class CategoriesPage {
    categories = $$('.category');
    editButtons = $$('.category__action--edit');
    deleteButtons = $$('.category__action--delete');
    noSubcategoriesIndex = 3;
    private loginPage = new LoginPage();

    async navigateTo() {
        await this.loginPage.navigateTo();
        await this.loginPage.emailInput.sendKeys('test@email.com');
        await this.loginPage.passwordInput.sendKeys('password');
        await this.loginPage.loginButton.click();
        return await browser.get('/categories');
    }
}
