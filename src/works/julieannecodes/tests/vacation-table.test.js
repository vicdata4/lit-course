import { expect, fixture, html } from '@open-wc/testing';
import '../VacationRequests/vacation-table.js';

const component = html`<vacation-table></vacation-table>`;
const sDate = new Date('2020-11-4');
const eDate = new Date('2020-11-11');
const dates = {
  detail: {
    id: 0,
    currentDate: new Date(),
    startDate: sDate,
    endDate: eDate,
    status: 'Pendiente de aprobación',
    statusDate: new Date(),
  },
};

describe('Default vacation table properties', async () => {
  let el;

  before(async () => {
    el = await fixture(component);
    await el.updateComplete;
  });

  it('Default properties', async () => {
    expect(el.vacationData.length).equal(0);
    expect(el.errorMessage).equal('');
    expect(el.from).equal(0);
    expect(el.nEmployees).equal(4);
    expect(el.to).equal(4);
  });
});

describe('Add vacation func', async () => {
  let el;
  before(async () => {
    el = await fixture(component);
    await el.updateComplete;
  });

  it('Add a vacation if date does not exist', async () => {
    el.addVacation(dates);

    await el.updateComplete;

    expect(el.vacationData.length).equal(1);
    expect(el.errorMessage).equal('');
  });

  it('Error adding existing date', async () => {
    const _dates = dates;
    _dates.id = 1;
    el.addVacation(_dates);

    expect(el.vacationData.length).equal(1);
    expect(el.errorMessage).equal('Date already exists');
  });
});

describe('Delete date func', async () => {
  let el;
  before(async () => {
    el = await fixture(component);
  });

  it('Delete selected data by id', async () => {
    const id = dates.id;
    el.deleteDate(id);

    await el.updateComplete;

    expect(el.vacationData.length).equal(0);
  });
});
