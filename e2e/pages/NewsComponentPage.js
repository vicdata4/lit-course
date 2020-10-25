const { By } = require('selenium-webdriver/lib/by');
const { findElement, findElements } = require('../utils/shadow-dom.js');
const assert = require('assert');

class NewsComponentPage {
  constructor(driver) {
    this.driver = driver;
    this.wcList = 'news-list';
  }

  async numberOfSearchResults(number) {
    const list = await findElements(this.wcList, By.css('.row.data'));
    assert.strictEqual(list.length, number);
  }
}

module.exports = NewsComponentPage;
