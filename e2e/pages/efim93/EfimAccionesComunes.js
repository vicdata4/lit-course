const { By } = require('selenium-webdriver');
const { findElement } = require('../../utils/shadow-dom');

class EfimAccionesComunes {
  constructor(driver) {
    this.driver = driver;
  }

  async selectUserFolder(buttonText) {
    const listButton = await findElement('works-view', By.linkText(buttonText));
    await listButton.click();
  }

  async selectAdminComponent(buttonText) {
    const submit = await findElement('efim93-page', By.className(buttonText));
    await submit.click();
  }
}

module.exports = EfimAccionesComunes;
