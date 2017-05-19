/**
 * videos.e2e-spec
 * admin.get-native.com
 *
 * Created by henryehly on 2017/05/19.
 */

import { VideosPage } from './videos.po';

describe('admin.get-native.com/videos', () => {
    let page: VideosPage;

    beforeEach(async () => {
        page = new VideosPage();
        await page.navigateTo();
    });

    it('populates the result field with text after selecting a video file', async () => {
        await page.chooseVideo();
        const text = await page.getTranscriptionTextareaValue();
        expect(text).toEqual('this is a video camera test this is a video camera test');
    });
});
