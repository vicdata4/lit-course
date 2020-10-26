import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../components/admin-vacation-form/components/admin-vacation-form';
import { empData } from '../utils/constants';

describe('Empty table', () => {
  let el;

  before(async () => {
    el = await fixture(html`<admin-vacation-form></admin-vacation-form>`);
    await el.updateComplete;
  });

  it('Empty list is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Default array length', async () => {
    const list = el.shadowRoot.querySelectorAll('td');
    expect(list.length).equal(0);
  });
  it('Call to a orderList() when 1 of 8 buttons are clicked', async () => {
    const eventSpy = sinon.spy(el, 'orderList');

    const deleteButttons = el.shadowRoot.querySelectorAll('button.order');
    let count = 0;
    deleteButttons.forEach((item) => {
      item.click();
      if (eventSpy.called) {
        count++;
      }
    });

    expect(count).equal(8);
  });
});

describe('Table with data and pagination = 3 (default)', () => {
  let el;

  before(async () => {
    const component = html` <admin-vacation-form .list="${empData}"></list-component> `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('List is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Default array length', async () => {
    const list = el.shadowRoot.querySelectorAll('tr');
    expect(list.length).equal(4);
  });

  it('Call to a orderList() when 1 of 8 buttons are clicked', async () => {
    const eventSpy = sinon.spy(el, 'orderList');

    const deleteButttons = el.shadowRoot.querySelectorAll('button.order');
    let count = 0;
    deleteButttons.forEach((item) => {
      item.click();
      if (eventSpy.called) {
        count++;
      }
    });

    expect(count).equal(8);
  });
});
