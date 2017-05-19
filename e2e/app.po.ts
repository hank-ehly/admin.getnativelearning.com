import { browser } from 'protractor';

export class AdminGetNativeComPage {
    async navigateTo() {
        return await browser.get('/');
    }
}
