import { expect, fixture, html } from '@open-wc/testing';
import '../components/vacation-detail/vacation-detail-admin';

describe('vacation approval function validation', () => {
  let el, array;
  const idSortedBy = [1, 2, 7, 6, 3, 5, 4, 0, 9, 8];

  before(async () => {
    const component = html`<vacation-detail-admin></vacation-detail-admin>`;
    el = await fixture(component);
    await el.updateComplete;
    array = [...el.listaDatos];
  });

  it('Returns array correctly sorted', async () => {
    expect(el.orderList(array[0].id)).to.eql(idSortedBy.id);
  });

  it('Dont show the pagination if the elements is 10 or less', async () => {
    const contenidosteper = el.shadowRoot.querySelector('.steper');
    expect(contenidosteper).to.be.null;
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

  describe('calculaDias method', () => {
    let el;
    before(async () => {
      const component = html`<vacation-detail-admin></vacation-detail-admin>`;
      el = await fixture(component);
      await el.updateComplete;
    });

    it('days correctly', async () => {
      const f1 = new Date('2020-09-14');
      const f2 = new Date('2020-09-23');
      const result = el.calculaDias(f1, f2);
      const milisegundos = new Date(f2) - new Date(f1);
      const fines = el.cuentaFindes(new Date(f1), new Date(f2));
      const dias = Math.ceil(milisegundos / (24 * 60 * 60 * 1000) + 1) - fines;
      expect(result).to.be.equal(dias);
    });
  });
});
