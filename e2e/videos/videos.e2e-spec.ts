/**
 * videos.e2e-spec
 * admin.get-native.com
 *
 * Created by henryehly on 2017/05/19.
 */

import { VideosPage } from './videos.po';
import { browser } from 'protractor';

describe('admin.get-native.com/videos', () => {
    let page: VideosPage;

    beforeEach(async () => {
        page = new VideosPage();
        await page.navigateTo();
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });

    it('populates the result field with text after selecting a video file', async () => {
        await page.chooseVideo();
        const text = await page.getTranscriptionTextareaValue();
        expect(text).toEqual('test 123');
    });
});
