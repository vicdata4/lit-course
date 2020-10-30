import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../components/admin-vacation-form/components/admin-vacation-form';
import { empData } from '../utils/constants';
import { orderedList } from '../utils/functions';

describe('Admin vacation form tests:', () => {
  describe('Empty applications table', () => {
    let el;

    before(async () => {
      el = await fixture(html`<admin-vacation-form></admin-vacation-form>`);
      await el.updateComplete;
    });

    it('Empty table is rendered correctly', async () => {
      expect(el.shadowRoot).not.to.be.null;
    });

    it('Render only table header', async () => {
      const cells = el.shadowRoot.querySelectorAll('td');
      expect(cells.length).equal(0);
    });
  });

  describe('When list length is bigger than pagination', () => {
    let el;

    before(async () => {
      const component = html` <admin-vacation-form .list="${empData}" .nElements="${10}"></list-component> `;

      el = await fixture(component);
      await el.updateComplete;
    });

    it('List is rendered correctly', async () => {
      expect(el.shadowRoot).not.to.be.null;
    });

    it('Show many rows as pagination + 1 (header)', async () => {
      const rows = el.shadowRoot.querySelectorAll('tr');
      expect(rows.length).equal(el.nElements + 1);
    });
  });

  describe('When list length is less than pagination', () => {
    let el;

    before(async () => {
      const component = html` <admin-vacation-form .list="${empData}" .nElements="${15}"></list-component> `;

      el = await fixture(component);
      await el.updateComplete;
    });

    it('List is rendered correctly', async () => {
      expect(el.shadowRoot).not.to.be.null;
    });

    it('Show many rows as array elements + 1 (header)', async () => {
      const rows = el.shadowRoot.querySelectorAll('tr');
      expect(rows.length).equal(el.list.length + 1);
    });
  });
  describe('Order method', () => {
    let el;

    before(async () => {
      const component = html` <admin-vacation-form .list="${empData}"></list-component> `;

      el = await fixture(component);
      await el.updateComplete;
    });
    it('Order method works properly', async () => {
      const orderButton = el.shadowRoot.querySelectorAll('a')[0];
      orderButton.click();
      const newList = orderedList(empData, 'name');
      expect(newList).to.eql(el.list);
    });
    it('Call to a orderList() when 1 of 8 buttons are clicked', async () => {
      const eventSpy = sinon.spy(el, 'orderList');

      const deleteButttons = el.shadowRoot.querySelectorAll('a');
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
  describe('Order method', () => {
    let el;

    before(async () => {
      const component = html` <admin-vacation-form .list="${empData}"></list-component> `;

      el = await fixture(component);
      await el.updateComplete;
    });
    it('Reverse order method works properly', async () => {
      const orderButton = el.shadowRoot.querySelectorAll('a')[0];
      orderButton.click();
      orderButton.click();
      const newList = orderedList(empData, 'name');
      const reverseList = orderedList(newList, 'name');
      expect(reverseList).to.eql(el.list);
    });
  });

  describe('Pagination navigate', () => {
    let el;

    before(async () => {
      const component = html` <admin-vacation-form .list="${empData}" .nElements="${10}"></list-component> `;

      el = await fixture(component);
      await el.updateComplete;
    });
    it('Show next page properly', async () => {
      const nextButton = el.shadowRoot.getElementById('next');
      nextButton.click();
      expect(el.index).equal(1);
    });
    it('Show the same page when array lenght is over', async () => {
      expect(el.index).equal(1);
    });
    it('Show the same page when index is 0', async () => {
      const nextButton = el.shadowRoot.getElementById('prev');
      nextButton.click();
      expect(el.index).equal(0);
    });
    it('Show the correct number of pages', async () => {
      const stepper = Math.ceil(empData.length / 10);
      expect(stepper).equal(el.stepper.length);
    });
    it('Go to a correct page when click on a number button', async () => {
      const nextButton = el.shadowRoot.getElementById('_1');
      nextButton.click();
      expect(el.index).equal(1);
    });
  });
});
