/**
 * categories.e2e-spec
 * admin.get-native.com
 *
 * Created by henryehly on 2017/06/01.
 */

import { browser } from 'protractor';

import { CategoriesPage } from './categories.po';

describe('admin.get-native.com/login', () => {
    let page: CategoriesPage;

    beforeEach(async () => {
        page = new CategoriesPage();
        await page.navigateTo();
    });

    afterEach(async () => {
        await browser.executeScript('window.localStorage.clear();');
    });

    it('should display a list of categories', () => {
        expect(page.categories.length).toBeGreaterThan(0);
    });

    it('should navigate to the category edit screen after pressing the edit button', async () => {
        await page.editButtons[0].click();
        expect(await browser.getCurrentUrl()).toMatch(/\/categories\/[0-9]+\/edit$/);
    });

    it('should disable the delete button if the number of categories is over 0', async () => {
        expect(await page.deleteButtons[0].isEnabled()).toBeFalsy();
    });

    it('should enable the delete button if the number of subcategories is 0', async () => {
        expect(await page.deleteButtons[page.noSubcategoriesIndex].isEnabled()).toBeTruthy();
    });
});
