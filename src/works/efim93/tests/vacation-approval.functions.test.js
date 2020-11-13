import { expect, fixture, html } from '@open-wc/testing';
import '../components/vacation-detail/vacation-detail-admin';

describe('vacation approval function validation', () => {
  let el, array;
  const idSortedBy = [1, 2, 7, 6, 3, 5, 4, 0, 9, 8];

  before(async () => {
    const component = html`<vacation-approval></vacation-approval>`;
    el = await fixture(component);
    await el.updateComplete;
    array = [...el.listaDatos];
  });

  it('Returns array correctly sorted', async () => {
    expect(el.orderList(array[0].id)).to.eql(idSortedBy.id);
  });
});

describe('Order method', () => {
  let el;

  before(async () => {
    const component = html`<vacation-detail-admin></vacation-detail-admin>`;
    el = await fixture(component);
    await el.updateComplete;
  });

  it('Order method works', async () => {
    const order = el.shadowRoot.querySelectorAll('.order')[1];
    order.click();
    const column = 'fecha_final';
    const myList = el.listaDatos;
    const newList = myList.sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    expect(newList).to.eql(el.listaDatos);
  });

  it('Reverse order method works properly', async () => {
    const orderButton = el.shadowRoot.querySelectorAll('.order')[0];
    orderButton.click();
    orderButton.click();
    const column = 'fecha_final';
    const myList = el.listaDatos;
    const reverseList = myList.sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    expect(reverseList).to.eql(el.listaDatos);
  });
});
