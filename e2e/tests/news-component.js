require('chromedriver');
const assert = require('assert');
const { By } = require('selenium-webdriver');
const { setConfig, findElements } = require('../utils/shadow-dom.js');
const { browserOptions } = require('../utils/config.js');

const url = 'http://localhost:2900/news-searcher';

describe('News searcher', function () {
  let driver;

  before(async function () {
    driver = await browserOptions({
      windowSize: {
        width: 640,
        height: 480,
      },
      headless: true,
    });
    await setConfig(driver, { url });
  });

  it('Default list contains 20 rows', async function () {
    const wc = 'news-list';

    const list = await findElements(wc, By.css('.row.data'));
    assert.strictEqual(list.length, 20);
  });

  after(() => driver && driver.quit());
});
