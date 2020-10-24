const { By } = require('selenium-webdriver');

let config = {};
let webComponent = {};

async function getExtShadowRoot(driver, parent) {
  let shadowHost;
  await (shadowHost = parent);
  return driver.executeScript('return arguments[0].shadowRoot', shadowHost);
}

async function findShadowDomElement(driver, parent, child = null) {
  const findBy = typeof child === 'string' ? By.css(child) : child;
  return getExtShadowRoot(driver, parent).then(async (result) => result.findElement(findBy));
}

async function findShadowDomElementList(driver, parent, child = null) {
  const findBy = typeof child === 'string' ? By.css(child) : child;
  return getExtShadowRoot(driver, parent).then(async (result) => result.findElements(findBy));
}

const shadowFinderWC = async (parent, tag) => {
  const list = await findShadowDomElementList(config.driver, parent, By.css('*'));

  for (const file of list) {
    const contents = await file.getTagName();
    if (contents.includes('-')) {
      await shadowFinderWC(file, tag);
      if (contents === tag) {
        webComponent = file;
        break;
      }
    }
  }
};

const findSingle = async (element, findBy) => {
  const app = await config.driver.findElement(By.css('app-shell'));
  await shadowFinderWC(app, element);
};

exports.findElement = async (element, findBy) => {
  await findSingle(element, findBy);
  return findShadowDomElement(config.driver, webComponent, findBy);
};

exports.findElements = async (element, findBy) => {
  await findSingle(element, findBy);
  return findShadowDomElementList(config.driver, webComponent, findBy);
};

exports.setConfig = async (driver, _config) => {
  config = _config;
  await driver.get(config.url);
  config.driver = driver;

  await new Promise((resolve, reject) => setTimeout(resolve, 1000));
};
