![](https://cdn.jsdelivr.net/gh/vicdata4/lit-course/assets/images/logo.png?v=4&s=100)

https://www.selenium.dev/documentation/en/


## Browser options
\
Default config is { headless: false } with the default browser windowSize.

```
const { browserOptions } = require('../utils/config.js');

before(async function () {
  driver = await browserOptions();
  await setConfig(driver, { url });
});
```

### Configuration examples:
\
Custom window size

```
before(async function () {
  driver = await browserOptions({
    windowSize: {
      width: 640,
      height: 480,
    }
  });

  await setConfig(driver, { url });
});
```

Headless mode

```
before(async function () {
  driver = await browserOptions({
    headless: true
  });

  await setConfig(driver, { url });
});
```

Window size and headless

```
before(async function () {
  driver = await browserOptions({
    headless: true,
    windowSize: {
      width: 640,
      height: 480,
    }
  });
});
```