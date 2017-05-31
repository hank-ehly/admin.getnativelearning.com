/**
 * videos.po
 * admin.get-native.com
 *
 * Created by henryehly on 2017/05/19.
 */

import { browser, element, by } from 'protractor';
import * as path from 'path';

import { LoginPage } from '../login/login.po';

export class VideosPage {
    private loginPage = new LoginPage();

    async navigateTo() {
        await this.loginPage.navigateTo();
        this.loginPage.emailInput.sendKeys('test@email.com');
        this.loginPage.passwordInput.sendKeys('password');
        this.loginPage.loginButton.click();
        return await browser.get('/videos');
    }

    async chooseVideo() {
        const filepath = path.resolve(__dirname, '..', 'fixtures', 'empty.txt');
        return await element(by.css('input[type=file]')).sendKeys(filepath);
    }

    async getTranscriptionTextareaValue() {
        return await element(by.css('textarea')).getText();
    }
}
