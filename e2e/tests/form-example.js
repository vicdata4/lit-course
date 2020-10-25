require('chromedriver');
const { setConfig } = require('../utils/shadow-dom.js');
const { browserOptions, url } = require('../config.js');

const FormExamplePage = require('../pages/home-page.js');
const CommonPage = require('../pages/common-page.js');

describe('Form-example happy path', function () {
  let driver;
  let formExample;
  let common;

  before(async function () {
    driver = await browserOptions();
    await setConfig(driver, { url });

    formExample = new FormExamplePage(driver);
    common = new CommonPage(driver);
  });

  it('Page title is correct', async function () {
    await common.checkPageTitle();
  });

  it('Go to form example', async function () {
    await common.goToFromHomePage('Form Example');
  });

  it('Fill email and password fields', async function () {
    await formExample.enterFormFields('test@email.com', 'vic12345');
  });

  it('Submit and confirm', async function () {
    await formExample.formSubmit();
    await formExample.isAlertVisible('.alert-succesfull');
  });

  after(() => driver && driver.quit());
});
