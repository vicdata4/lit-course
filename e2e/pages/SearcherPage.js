const { By } = require('selenium-webdriver');
const { findElement, findElements } = require('../utils/shadow-dom.js');
const CommonActions = require('./CommonActions.js');
const assert = require('assert');

class SearcherPage extends CommonActions {
  constructor(driver) {
    super(driver);
    this.driver = driver;
    this.wcList = 'searcher-list';
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

  async resultsMessage(nResults) {
    const messageBox = await findElement('news-searcher', By.css('.result-msg'));
    const text = await messageBox.getAttribute('textContent');
    assert.strictEqual(text, `${nResults} results about`);
  }
}

module.exports = SearcherPage;
