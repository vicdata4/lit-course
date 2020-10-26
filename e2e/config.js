const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { setDriver } = require('./utils/shadow-dom.js');

const defaultUrl = 'http://localhost:2900';

exports.browserConfig = async (config = false) => {
  let builder = new Builder().forBrowser('chrome');

  const url = config && config.url ? config.url : defaultUrl;

  if (config && config.windowSize) {
    builder = builder.setChromeOptions(new chrome.Options().windowSize(config.windowSize));
  }

  if (!config || config.headless) {
    builder = builder.setChromeOptions(new chrome.Options().headless());
  }

  const driver = await builder.build();
  await driver.manage().setTimeouts({ implicit: 6000 });
  await driver.get(url);

  await setDriver(driver, { url });

  return driver;
};
