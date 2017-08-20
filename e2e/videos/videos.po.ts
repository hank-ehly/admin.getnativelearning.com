/**
 * videos.po
 * admin.getnativelearning.com
 *
 * Created by henryehly on 2017/05/19.
 */

import { browser, element, by } from 'protractor';
import * as path from 'path';

import { LoginPage } from '../login/login.po';

export class VideosPage {
    transcribeButton = element(by.id('transcribe-button'));
    textarea = element(by.css('textarea'));
    fileInput = element(by.css('input[type=file]'));

    private loginPage = new LoginPage();

    async navigateTo() {
        await this.loginPage.navigateTo();
        await this.loginPage.emailInput.sendKeys('test@email.com');
        await this.loginPage.passwordInput.sendKeys('password');
        await this.loginPage.loginButton.click();
        return await browser.get('/videos');
    }

    async chooseVideo() {
        const filepath = path.resolve(__dirname, '..', 'fixtures', 'empty.txt');
        return await this.fileInput.sendKeys(filepath);
    }

    async clickTranscribeButton() {
        return await this.transcribeButton.click();
    }

    async getTranscriptionTextareaValue() {
        return await this.textarea.getText();
    }
}
