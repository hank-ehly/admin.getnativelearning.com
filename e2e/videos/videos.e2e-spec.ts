/**
 * videos.e2e-spec
 * admin.get-native.com
 *
 * Created by henryehly on 2017/05/19.
 */

import { browser } from 'protractor';

import { VideosPage } from './videos.po';

describe('admin.get-native.com/videos', () => {
    let page: VideosPage;

    beforeEach(async () => {
        page = new VideosPage();
        await page.navigateTo();
    });

    afterEach(async () => {
        await browser.executeScript('window.localStorage.clear();');
    });

    it('should disable the transcribe button by default', async () => {
        expect(await page.transcribeButton.getAttribute('disabled')).toBeTruthy();
    });

    it('should enable the transcribe button only after a video has been chosen', async () => {
        await page.chooseVideo();
        expect(await page.transcribeButton.getAttribute('disabled')).toBeFalsy();
    });

    it('populates the result field after selecting a video and clicking the transcribe button', async () => {
        await page.chooseVideo();
        await page.clickTranscribeButton();
        const text = await page.getTranscriptionTextareaValue();
        expect(text).toEqual('test 123');
    });
});
