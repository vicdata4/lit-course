const { By } = require('selenium-webdriver');
const { findElement, findElements } = require('../utils/shadow-dom.js');
const CommonActions = require('./CommonActions.js');
const assert = require('assert');

class NewsComponentPage extends CommonActions {
  constructor(driver) {
    super(driver);
    this.driver = driver;
    this.wcList = 'news-list';
    this.wcInput = 'input-component';
  }

  async searchAnotherTerm(term) {
    const input = await findElement(this.wcInput, By.id('message'));
    await input.sendKeys(term);

    const submit = await findElement(this.wcInput, By.css('.btn-submit'));
    this.actionClick(submit);
  }

  async numberOfSearchResults(number) {
    const list = await findElements(this.wcList, By.css('.row.data'));
    assert.strictEqual(list.length, number);
  }
}

module.exports = NewsComponentPage;
