/**
 * login.po
 * admin.get-native.com
 *
 * Created by henryehly on 2017/05/30.
 */

import { browser, by, element } from 'protractor';

export class LoginPage {
    loginButton = element(by.css('button[type=submit]'));
    emailInput = element(by.css('input[type=email]'));
    passwordInput = element(by.css('input[type=password]'));

    async navigateTo() {
        return await browser.get('/login');
    }
}
