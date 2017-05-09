import { browser, element, by } from 'protractor';

export class Admin.GetNative.ComPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('gn-root h1')).getText();
  }
}
