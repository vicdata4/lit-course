require('chromedriver');
const { browserConfig } = require('../config.js');

const NewsComponentPage = require('../pages/NewsComponentPage.js');
const CommonActions = require('../pages/CommonActions.js');

describe('News searcher', () => {
  let driver;
  let newsComponent;
  let common;

  before(async () => {
    driver = await browserConfig();

    newsComponent = new NewsComponentPage(driver);
    common = new CommonActions(driver);
  });

  it('Page title is correct', async () => common.checkPageTitle());
  it('Go to form example view', async () => common.selectListElement('Searcher'));
  it('Default search "Polymer" return 20 results', async () => newsComponent.numberOfSearchResults(20));
  it('Search "React" term', async () => newsComponent.searchAnotherTerm('React'));
  it('Search result for "React" return 20 results', async () => newsComponent.numberOfSearchResults(20));
  it('Search term without results', async () => newsComponent.searchAnotherTerm('alskdfnlaksd'));
  it('No results message', async () => newsComponent.resultsMessage(0));

  after(() => driver && driver.quit());
});
