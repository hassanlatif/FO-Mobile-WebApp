import { HajjMobilePage } from './app.po';

describe('hajj-mobile App', () => {
  let page: HajjMobilePage;

  beforeEach(() => {
    page = new HajjMobilePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
