![](https://cdn.jsdelivr.net/gh/vicdata4/lit-course/assets/images/logo.png?v=4&s=100)

https://www.selenium.dev/documentation/en/

https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/


## Browser Configuration
\
By default:

- Enabled headless mode
- URL = http://localhost:2900
```js
before(async () => {
  driver = await browserConfig();
});
```
Disable headless mode
```js
driver = await browserConfig({ headless: false });
```
Custom URL
```js
driver = await browserConfig({ url: 'https://google.com', headless: false });
```
Custom window size
```js
driver = await browserConfig({
  windowSize: {
    width: 640,
    height: 480
  }
});
```



## Test file
e2e/tests/form-example.test.js

```js
const { browserConfig } = require('../config.js');
const CommonActions = require('../pages/CommonActions.js');

describe('Form-example happy path', function () {
  let driver;
  let common;

  before(async () => {
    driver = await browserConfig();
    common = new CommonActions(driver);
  });

  it('Page title is correct', async () => common.checkPageTitle());
  after(() => driver && driver.quit());
});
```

## Page Object
e2e/pages/CommonActions.js

```js
const { By } = require('selenium-webdriver');
const assert = require('assert');

class CommonActions {
  constructor(driver) {
    this.driver = driver;
  }

  async checkPageTitle(title = 'LitCourse') {
    const title_ = await this.driver.getTitle();
    assert.strictEqual(title_, title);
  }
}

module.exports = CommonActions;
```

## Shadow Root Support

If you are using web-components, you can import `findElement` and `findElements` functions in order to find elements across the shadow-root node.

Example
```js
const { By } = require('selenium-webdriver');
const { findElement, findElements } = require('../utils/shadow-dom.js');

class FormExamplePage {
  constructor(driver) {
    this.driver = driver;
    this.wc = 'form-example';
  }

  async enterFormFields(email) {
    // Get a single element
    const mail = await findElement(this.wc, By.id('email'));
    await mail.sendKeys(email);
  }

  async numberOfSearchResults(number) {
    // Get a list of elements
    const list = await findElements(this.wc, By.css('.row.data'));
    assert.strictEqual(list.length, number);
  }

  async formSubmit() {
    const submit = await findElement(this.wc, By.css('input[type=submit]'));
    await submit.click();
  }
}

module.exports = FormExamplePage;

```