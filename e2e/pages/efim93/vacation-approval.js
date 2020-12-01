const { By } = require('selenium-webdriver');
const { findElement } = require('../../utils/shadow-dom.js');

class AdminVacationApproval {
  constructor(driver) {
    this.driver = driver;
    this.wc = 'vacation-approval';
  }

  async selectChangedSelect() {
    const select = await findElement(this.wc, By.className('select'));
    await select.click();
    const optionNumer = Math.floor(Math.random() * 2 + 1);
    const option = await findElement(this.wc, By.css('option[value="' + optionNumer + '"]'));
    await option.click();
  }

  async selectOrderButton() {
    // eslint-disable-next-line no-undef
    const select = await findElement(this.wc, By.className('order'));
    await select.click();
  }
}

module.exports = AdminVacationApproval;
