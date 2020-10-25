const { By } = require('selenium-webdriver/lib/by');
const { findElement } = require('../utils/shadow-dom.js');
const assert = require('assert');

class CommonPage {
  constructor(driver) {
    this.driver = driver;
    this.ref = 'home-view';
  }

  async checkPageTitle(title = 'LitCourse') {
    const title_ = await this.driver.getTitle();
    assert.strictEqual(title_, title);
  }

  async goToFromHomePage(buttonText) {
    const listButton = await findElement(this.ref, By.linkText(buttonText));
    await listButton.click();
  }
}

module.exports = CommonPage;
