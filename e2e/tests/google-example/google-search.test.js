const { By, Key } = require('selenium-webdriver');
const { browserConfig } = require('../../config.js');

describe('Google search', function () {
  let driver;

  before(async () => {
    driver = await browserConfig({
      url: 'https://www.google.com/',
      headless: false,
    });
  });

  it('Agree cookies', async () => {
    await driver.switchTo().frame(0);

    const submit = await driver.findElement(By.id('introAgreeButton'));
    await submit.click();
  });

  it('Enter "traductor" search', async () => {
    const input = await driver.findElement(By.css('input[name=q]'));
    await input.sendKeys('traductor', Key.ENTER);
  });

  it('Enter text to translate', async () => {
    const input = await driver.findElement(By.id('tw-source-text-ta'));
    await input.sendKeys('hello world');
  });

  it('Select language', async () => {
    const languageBtn = await driver.findElement(By.id('tw-tl'));
    await languageBtn.click();
  });

  it('Enter language', async () => {
    const input = await driver.findElement(By.id('tl_list-search-box'));
    await input.sendKeys('french', Key.ENTER);
  });

  it('Enter LitCourse', async () => {
    const input = await driver.findElement(By.css('input[name=q]'));
    await input.clear();
    await input.sendKeys('lit-course.site', Key.ENTER);
  });

  it('Select LitCourse result', async () => {
    const litCourseBtn = await driver.findElement(By.xpath('//*[contains(text(),"LitCourse")]'));
    await litCourseBtn.click();
  });

  it('Wait until LitCourse page is visible', async () => {
    await driver.findElement(By.css('app-shell'));
  });

  after(() => driver && driver.quit());
});
