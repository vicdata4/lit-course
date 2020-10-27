const { By } = require('selenium-webdriver');

let driver = {};
let webComponent = {};

async function getExtShadowRoot(parent) {
  let shadowHost;
  await (shadowHost = parent);
  return driver.executeScript('return arguments[0].shadowRoot', shadowHost);
}

async function findShadowDomElement(parent, findBy, list = false) {
  return getExtShadowRoot(parent).then(async (result) =>
    !list ? result.findElement(findBy) : result.findElements(findBy),
  );
}

const findWebComponent = async (parent, tag) => {
  try {
    const list = await findShadowDomElement(parent, By.css('*'), true);

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
  } catch (e) {}
};

const rootNode = async (element) => {
  const app = await driver.findElement(By.css('app-shell'));
  await findWebComponent(app, element);
};

exports.findElement = async (element, findBy) => {
  await rootNode(element);
  return findShadowDomElement(webComponent, findBy);
};

exports.findElements = async (element, findBy) => {
  await rootNode(element);
  return findShadowDomElement(webComponent, findBy, true);
};

exports.setDriver = async (driver_) => {
  driver = driver_;
};
