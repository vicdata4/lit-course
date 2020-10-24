const { By } = require('selenium-webdriver');

let config = {};
const url = 'http://localhost:2900';

async function getExtShadowRoot(driver, parent) {
  let shadowHost;
  await (shadowHost = parent);
  return driver.executeScript('return arguments[0].shadowRoot', shadowHost);
}

async function findShadowDomElement(driver, parent, child = null) {
  const findBy = typeof child === 'string' ? By.css(child) : child;
  return getExtShadowRoot(driver, parent).then(async (result) => result.findElement(findBy));
}

const shadowFinder = async (config, findBy) => {
  const app = await config.driver.findElement(By.css('app-shell'));
  const view = await findShadowDomElement(config.driver, app, config.view);
  const component = await findShadowDomElement(config.driver, view, config.component);

  return findShadowDomElement(config.driver, component, findBy);
};

exports.findElement = async (by) => shadowFinder(config, by);

exports.setConfig = async (driver, _config) => {
  config = _config;
  await driver.get(`${url}${config.path}`);
  config.driver = driver;
};
