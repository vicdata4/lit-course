import { expect, fixture, html } from '@open-wc/testing';
import '../solicitudVacaciones/table-requests';
import '../adminHoliday/table-admin';
import { data } from '../solicitudVacaciones/utils/constants';
import { employeeRequest } from '../adminHoliday/utils/constants';

describe('Table pagination, stepper', () => {
  let el;

  before(async () => {
    const component = html` <table-requests .tableRequests="${data}" .nElements="${2}"></table-requests> `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Show next page ', async () => {
    const nextButton = el.shadowRoot.querySelector('.next');
    nextButton.click();
    expect(el.index).to.eql(1);
  });

  it('Pagination over index remains ok', async () => {
    expect(el.index).equal(1);
  });

  it('Index is equal 0 and it shows same page, ok', async () => {
    const prevButton = el.shadowRoot.querySelector('.prev');
    prevButton.click();
    expect(el.index).equal(0);
  });

  it('Number of pages ok', async () => {
    const stepper = Math.ceil(data.length / 2);
    expect(stepper).equal(el.stepper.length);
  });

  it('Number of buttons is ok', async () => {
    const nextButton = el.shadowRoot.getElementById('_0');
    nextButton.click();
    expect(el.index).equal(0);
  });
});

describe('Admin table pagination, stepper', () => {
  let el;

  before(async () => {
    const component = html` <table-admin .adminTable="${employeeRequest}" .nElements="${10}"></table-admin> `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Pagination over index remains ok', async () => {
    expect(el.index).equal(0);
  });

  it('Number of pages admin ok', async () => {
    const stepper = Math.ceil(employeeRequest.length / 10);
    expect(stepper).equal(el.stepper.length);
  });

  it('Number of buttons is ok', async () => {
    const nextButton = el.shadowRoot.getElementById('_0');
    nextButton.click();
    expect(el.index).equal(0);
  });
});
