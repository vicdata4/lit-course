import { expect, fixture, html } from '@open-wc/testing';
import '../VacationRequests/vacation-table.js';
import { employeeList } from '../utils/employees';

const component = html`<vacation-table></vacation-table>`;
const comp = html`<vacation-table .vacationData="${employeeList.slice(0, 6)}"></vacation-table>`;
const interval = {
  detail: [4, 8],
};
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

  it('Add a vacation if date does not exist to empty array', async () => {
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
  let el, stepper;
  before(async () => {
    el = await fixture(comp);

    await el.updateComplete;
    stepper = el.shadowRoot.querySelector('stepper-component');
  });

  it('Delete selected data by id', async () => {
    const id = el.vacationData[5].id;
    el.from = 4;
    el.to = 8;
    el.deleteDate(id);
    await el.updateComplete;

    expect(el.vacationData.length).equal(5);
  });

  it('VacationData array length equals from property', async () => {
    const id = el.vacationData[4].id;

    el.deleteDate(id);

    await el.updateComplete;

    expect(el.from).equal(0);
    expect(el.to).equal(4);
    expect(stepper.setActiveStep(0 / 4)).equal(0);
  });
});

describe('Get from and to values', async () => {
  let el;
  before(async () => {
    el = await fixture(comp);
    await el.updateComplete;
  });

  it('Getting values for index 1', async () => {
    el.from = 0;
    el.to = 4;
    el.getValues(interval);
    await el.updateComplete;

    expect(el.from).equal(4);
    expect(el.to).equal(8);
  });

  it('Getting values for index 0', async () => {
    const newInterval = interval;
    newInterval.detail[0] = 0;
    newInterval.detail[1] = 4;

    el.getValues(newInterval);

    await el.updateComplete;

    expect(el.from).equal(0);
    expect(el.to).equal(4);
  });
});
