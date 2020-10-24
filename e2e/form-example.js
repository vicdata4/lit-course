require('chromedriver');
const assert = require('assert');
const { Builder, By } = require('selenium-webdriver');
const { setConfig, findElement } = require('./utils/shadow-utils.js');

const url = 'http://localhost:2900/form-example-view';

describe('Form-example happy path', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await setConfig(driver, { url });
  });

  it('Page title is correct', async function () {
    const title = await driver.getTitle();
    assert.strictEqual(title, 'LitCourse');
  });

  it('Fill email and password fields', async function () {
    const wc = 'form-example';

    const mail = await findElement(wc, By.id('email'));
    await mail.sendKeys('sdfg@sdf.com');

    const password = await findElement(wc, By.id('password'));
    await password.sendKeys('vic12345');
  });

  after(() => driver && driver.quit());
});
