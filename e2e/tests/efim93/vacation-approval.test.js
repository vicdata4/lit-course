const { browserConfig } = require('../../config.js');

const AdminVacationApproval = require('../../pages/efim93/vacation-approval.js');
const CommonActions = require('../../pages/CommonActions.js');
const EfimAcionesComunes = require('../../pages/efim93/EfimAccionesComunes.js');

describe('Admin vacation form select', function () {
  let driver;
  let vacationApproval;
  let common;
  let aCommon;

  before(async () => {
    driver = await browserConfig({ headless: false, url: 'http://localhost:3000' });

    vacationApproval = new AdminVacationApproval(driver);
    common = new CommonActions(driver);
    aCommon = new EfimAcionesComunes(driver);
  });

  it('Page title is correct', async () => common.checkPageTitle());
  it('Go to works view', async () => common.selectListElement('Works'));
  it('Go to user works folder', async () => aCommon.selectUserFolder('efim93'));
  it('Go to AdminVacationForm view', async () => aCommon.selectAdminComponent('common-btn'));
  it('Change select from the first row', async () => vacationApproval.selectChangedSelect());
  it('Click to order button', async () => vacationApproval.selectOrderButton());

  after(() => driver && driver.quit());
});
