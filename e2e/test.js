require('chromedriver');
const assert = require('assert');
const { Builder, By } = require('selenium-webdriver');
const { findElement, setConfig } = require('./utils/shadow-utils.js');

const config = {
  path: '/form-example-view',
  view: 'form-example-view',
  component: 'form-example',
};

describe('Form-example happy path', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await setConfig(driver, config);
  });

  it('Page title is correct', async function () {
    const title = await driver.getTitle();
    assert.strictEqual(title, 'LitCourse');
  });

  it('Fill email and password fields', async function () {
    const mail = await findElement(By.id('email'));
    await mail.sendKeys('sdfg@sdf.com');

    const password = await findElement(By.id('password'));
    await password.sendKeys('vic12345');

    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  });

  after(() => driver && driver.quit());
});
