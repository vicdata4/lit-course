import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../solicitudVacaciones/table-requests';
import { data } from '../solicitudVacaciones/utils/constants';
import { orderList } from '../solicitudVacaciones/utils/functions';

describe('Empty table requests', () => {
  let el;
  before(async () => {
    el = await fixture(html`<table-requests></table-requests>`);
    await el.updateComplete;
  });

  it('Empty table is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Default array table length', async () => {
    const tableRequests = el.shadowRoot.querySelectorAll('tr');
    expect(tableRequests.length).equal(1);
  });
});

describe('Table requests with data', () => {
  let el;

  before(async () => {
    const component = html` <table-requests .tableRequests="${data}"></table-requests>`;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Table is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Default array length', async () => {
    const tableRequests = el.shadowRoot.querySelectorAll('tr');
    expect(tableRequests.length).equal(4);
  });

  it('Dispatch "delete" event after click on the trash button', async () => {
    const eventSpy = sinon.spy(el, 'dispatchEvent');

    const deleteButton = el.shadowRoot.querySelectorAll('#btnPapelera')[0];
    deleteButton.click();

    expect(eventSpy).calledOnce;
    expect(eventSpy.args[0][0].type).to.equal('delete-event');
  });
});

describe('Order function', () => {
  let el;
  before(async () => {
    const component = html` <table-requests .tableRequests="${data}"></table-requests> `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Order requests works properly', async () => {
    const orderButton = el.shadowRoot.querySelectorAll('.btnOrder')[0];
    orderButton.click();
    const newList = orderList(data, 'infoFI');
    expect(newList).to.eql(el.tableRequests);
  });

  it('Reverse requests works properly', async () => {
    const orderButton = el.shadowRoot.querySelectorAll('.btnOrder')[0];
    orderButton.click();
    orderButton.click();
    const newList = orderList(data, 'infoFI');
    const reverseList = orderList(newList, 'infoFI');
    expect(reverseList).to.eql(el.tableRequests);
  });
});
