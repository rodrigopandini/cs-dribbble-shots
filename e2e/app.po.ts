import { browser, element, by } from 'protractor';

export class CSDribbbleShotListPage {
  navigateToHome() {
    browser.get('/');
    return browser.waitForAngular();
  }

  navigateToShot() {
    browser.get('/shots/3305539');
    return browser.waitForAngular();
  }

  getFirstChildren() {
    return element(by.css('app-root router-outlet')).all.length;
  }

  getSecondChildren() {
    return element(by.css('app-root app-shot-list')).all.length;
  }

  getCountShotCard() {
    return element(by.css('md-cart')).all.length;
  }

}
