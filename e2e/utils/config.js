const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

exports.browserOptions = async (config = {}) => {
  let builder = new Builder().forBrowser('chrome');

  if (config.windowSize) {
    builder = builder.setChromeOptions(new chrome.Options().windowSize(config.windowSize));
  }

  if (config.headless) {
    builder = builder.setChromeOptions(new chrome.Options().headless());
  }

  return builder.build();
};
