const { By } = require('selenium-webdriver');

let config = {};
let webComponent = {};

async function getExtShadowRoot(driver, parent) {
  let shadowHost;
  await (shadowHost = parent);
  return driver.executeScript('return arguments[0].shadowRoot', shadowHost);
}

async function findShadowDomElement(driver, parent, findBy, list = false) {
  return getExtShadowRoot(driver, parent).then(async (result) =>
    !list ? result.findElement(findBy) : result.findElements(findBy),
  );
}

const findWebComponent = async (parent, tag) => {
  const list = await findShadowDomElement(config.driver, parent, By.css('*'), true);

  for (const file of list) {
    const contents = await file.getTagName();
    if (contents.includes('-')) {
      await findWebComponent(file, tag);
      if (contents === tag) {
        webComponent = file;
        break;
      }
    }
  }
};

const rootNode = async (element, findBy) => {
  const app = await config.driver.findElement(By.css('app-shell'));
  await findWebComponent(app, element);
};

exports.findElement = async (element, findBy) => {
  await rootNode(element, findBy);
  return findShadowDomElement(config.driver, webComponent, findBy);
};

exports.findElements = async (element, findBy) => {
  await rootNode(element, findBy);
  return findShadowDomElement(config.driver, webComponent, findBy, true);
};

exports.setConfig = async (driver, _config) => {
  config = _config;
  await driver.get(config.url);
  config.driver = driver;

  await driver.sleep(1000);
};
