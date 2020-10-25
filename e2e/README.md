![](https://cdn.jsdelivr.net/gh/vicdata4/lit-course/assets/images/logo.png?v=4&s=100)

https://www.selenium.dev/documentation/en/


## Browser Configuration
\
Default configuration:

- Enabled headless mode
- Default URL = http://localhost:2900
```
before(async () => {
  driver = await browserConfig();
});
```
Disable headless mode
```
driver = await browserConfig({ headless: false });
```
Custom URL
```
driver = await browserConfig({ url: 'https://google.com, headless: false });
```
Custom window size
```
driver = await browserConfig({
  windowSize: {
    width: 640,
    height: 480
  }
});
```



## Test file
e2e/tests/form-example.test.js

```
require('chromedriver');
const { browserConfig } = require('../config.js');
const CommonPage = require('../pages/CommonPage.js');

describe('Form-example happy path', function () {
  let driver;
  let common;

  before(async () => {
    driver = await browserConfig();
    common = new CommonPage(driver);
  });

  it('Page title is correct', async () => common.checkPageTitle());
  after(() => driver && driver.quit());
});
```

## Page Object
e2e/pages/CommonPage.js

```
const { By } = require('selenium-webdriver/lib/by');
const assert = require('assert');

class CommonPage {
  constructor(driver) {
    this.driver = driver;
  }

  async checkPageTitle(title = 'LitCourse') {
    const title_ = await this.driver.getTitle();
    assert.strictEqual(title_, title);
  }
}

module.exports = CommonPage;
```