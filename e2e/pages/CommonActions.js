const { By } = require('selenium-webdriver');
const { findElement } = require('../utils/shadow-dom.js');
const assert = require('assert');

class CommonActions {
  constructor(driver) {
    this.driver = driver;
  }

  async checkPageTitle(title = 'LitCourse') {
    const title_ = await this.driver.getTitle();
    assert.strictEqual(title_, title);
  }

  async selectListElement(buttonText) {
    const listButton = await findElement('navigation-wc', By.linkText(buttonText));
    await listButton.click();
  }

  /*
   * COMMON ELEMENT ACTIONS
   */

  async actionClick(element) {
    const actions = this.driver.actions({ bridge: true });
    await actions.click(element).perform();
  }
}

module.exports = CommonActions;
