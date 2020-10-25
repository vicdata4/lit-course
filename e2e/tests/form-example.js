require('chromedriver');
const { setConfig } = require('../utils/shadow-dom.js');
const { browserOptions, url } = require('../config.js');

const FormExamplePage = require('../pages/FormExamplePage.js');
const CommonPage = require('../pages/CommonPage.js');

describe('Form-example happy path', function () {
  let driver;
  let formExample;
  let common;

  before(async () => {
    driver = await browserOptions();
    await setConfig(driver, { url });

    formExample = new FormExamplePage(driver);
    common = new CommonPage(driver);
  });

  it('Page title is correct', async () => common.checkPageTitle());
  it('Go to form example view', async () => common.goToFromHomePage('Form Example'));
  it('Fill email and password fields', async () => formExample.enterFormFields('test@email.com', 'vic12345'));
  it('Click on submit button', async () => formExample.formSubmit());
  it('Succesfull alert is visible', async () => formExample.isAlertVisible('.alert-succesfull'));

  after(() => driver && driver.quit());
});

describe('Form-example error', async () => {
  let driver;
  let formExample;

  before(async () => {
    driver = await browserOptions();
    await setConfig(driver, { url });

    formExample = new FormExamplePage(driver);
  });

  it('Go to form example view', async () => new CommonPage(driver).goToFromHomePage('Form Example'));
  it('Fill email and password fields', async () => formExample.enterFormFields('test@email', 'vic12345'));
  it('Click on submit button', async () => formExample.formSubmit());
  it('Error message is visible', async () => formExample.isAlertVisible('.alert-msg'));
  it('Error text is correct', async () => formExample.checkErrorMessage('Enter a valid email'));

  after(() => driver && driver.quit());
});
