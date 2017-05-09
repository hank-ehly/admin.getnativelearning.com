import { Admin.GetNative.ComPage } from './app.po';

describe('admin.get-native.com App', () => {
  let page: Admin.GetNative.ComPage;

  beforeEach(() => {
    page = new Admin.GetNative.ComPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('gn works!');
  });
});
