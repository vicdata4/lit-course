import { expect, fixture, html } from '@open-wc/testing';
import '../vacationHistoryEmp/vacation-history.js';
import { vacationDates } from '../utils/vacation-dates';
const component = html`<vacation-history></vacation-history>`;
const interval = {
  detail: [0, 4],
};

describe('Default vacation history properties and render', async () => {
  let el;

  before(async () => {
    el = await fixture(component);
    await el.updateComplete;
  });

  it('Default properties', async () => {
    expect(el.vacationDates).to.eql(vacationDates);
    expect(el.from).equal(0);
    expect(el.nDates).equal(4);
    expect(el.to).equal(4);
  });

  it('Render component if empty array', async () => {
    el.vacationDates = [];
    expect(el.shadowRoot).not.to.be.null;
    expect(el.vacationDates.length).equal(0);
  });
});

describe('Vacation history stepper', async () => {
  let el;
  before(async () => {
    el = await fixture(component);
    await el.updateComplete;
  });

  it('Not rendered stepper when length < 4', async () => {
    const stepper = html`<stepper-component></stepper-component>`;
    el.vacationDates = [{}, {}, {}];
    await el.updateComplete;

    expect(el.shadowRoot).to.not.include(stepper);
  });

  it('Get from and to values', async () => {
    el.getValues(interval);
    await el.updateComplete;

    expect(el.from).equal(0);
    expect(el.to).equal(4);
  });
});
