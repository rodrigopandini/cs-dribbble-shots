import { CSDribbbleShotListPage } from './app.po';

describe('cs-dribbble-shots App', () => {
  let page: CSDribbbleShotListPage;

  beforeEach(() => {
    page = new CSDribbbleShotListPage();
  });

  it('should have only one router-outlet', () => {
    page.navigateToHome();
    expect(page.getFirstChildren()).toEqual(1);
  });

  it('should have only one app-shot-list', () => {
    page.navigateToHome();
    expect(page.getSecondChildren()).toEqual(1);
  });

  it('should have only one md-card', () => {
    page.navigateToShot();
    expect(page.getCountShotCard()).toEqual(1);
  });

});
