/* eslint-disable no-console */
require('chromedriver');
const assert = require('assert');
const { Builder, By } = require('selenium-webdriver');
const { setConfig, findElements } = require('./utils/shadow-utils.js');

const url = 'http://localhost:2900/news-searcher';

describe('News searcher', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await setConfig(driver, { url });
  });

  it('Default list contains 20 rows', async function () {
    const wc = 'news-list';

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const list = await findElements(wc, By.css('.row.data'));

    assert.strictEqual(list.length, 20);
  });

  after(() => driver && driver.quit());
});
