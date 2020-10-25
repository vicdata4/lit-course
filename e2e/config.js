const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { setConfig } = require('./utils/shadow-dom.js');

exports.url = 'http://localhost:2900';

exports.browserConfig = async (url, config = false) => {
  let builder = new Builder().forBrowser('chrome');

  if (config !== {} && config.windowSize) {
    builder = builder.setChromeOptions(new chrome.Options().windowSize(config.windowSize));
  }

  if (!config || config.headless) {
    builder = builder.setChromeOptions(new chrome.Options().headless());
  }

  const driver = await builder.build();
  await driver.manage().setTimeouts({ implicit: 6000 });
  await driver.get(url);

  await setConfig(driver, { url });

  return driver;
};
