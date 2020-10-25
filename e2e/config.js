const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

exports.url = 'http://localhost:2900';

exports.browserOptions = async (config = false) => {
  let builder = new Builder().forBrowser('chrome');

  if (config !== {} && config.windowSize) {
    builder = builder.setChromeOptions(new chrome.Options().windowSize(config.windowSize));
  }

  if (!config || config.headless) {
    builder = builder.setChromeOptions(new chrome.Options().headless());
  }

  return builder.build();
};
