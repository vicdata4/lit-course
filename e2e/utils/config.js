const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

exports.browserOptions = async (config = {}) => {
  let builder = new Builder().forBrowser('chrome');

  if (config.screenSize) {
    builder = builder.setChromeOptions(new chrome.Options().windowSize(config.screenSize));
  }

  if (config.headless) {
    builder = builder.setChromeOptions(new chrome.Options().headless());
  }

  return builder.build();
};
