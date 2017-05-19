/**
 * videos.po
 * admin.get-native.com
 *
 * Created by henryehly on 2017/05/19.
 */

import { browser, element, by } from 'protractor';
import * as path from 'path';

export class VideosPage {
    async navigateTo() {
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
