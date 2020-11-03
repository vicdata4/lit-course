const { browserConfig } = require('../config.js');

const SearcherPage = require('../pages/SearcherPage.js');
const CommonActions = require('../pages/CommonActions.js');

describe('News searcher', () => {
  let driver;
  let searcher;
  let common;

  before(async () => {
    driver = await browserConfig();

    searcher = new SearcherPage(driver);
    common = new CommonActions(driver);
  });

  it('Page title is correct', async () => common.checkPageTitle());
  it('Go to form example view', async () => common.selectListElement('Searcher'));
  it('Default search "Polymer" return 20 results', async () => searcher.numberOfSearchResults(20));
  it('Search "React" term', async () => searcher.searchAnotherTerm('React'));
  it('Search result for "React" return 20 results', async () => searcher.numberOfSearchResults(20));
  it('Search term without results', async () => searcher.searchAnotherTerm('alskdfnlaksd'));
  it('No results message', async () => searcher.resultsMessage(0));

  after(() => driver && driver.quit());
});
