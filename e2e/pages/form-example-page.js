const { By } = require('selenium-webdriver/lib/by');
const { findElement } = require('../utils/shadow-dom.js');
const assert = require('assert');

class FormExamplePage {
  constructor(driver) {
    this.driver = driver;
    this.ref = 'form-example';
  }

  async enterFormFields(email, password) {
    const mail = await findElement(this.ref, By.id('email'));
    await mail.sendKeys(email);

    const pwd = await findElement(this.ref, By.id('password'));
    await pwd.sendKeys(password);
  }

  async formSubmit() {
    const submit = await findElement(this.ref, By.css('input[type=submit]'));
    await submit.click();
  }

  async isAlertVisible(className) {
    await findElement(this.ref, By.css(className));
  }

  async checkErrorMessage(message) {
    const alert = await findElement(this.ref, By.css('.alert-msg'));
    const text = await alert.getText();

    assert.strictEqual(text, message);
  }
}

module.exports = FormExamplePage;
