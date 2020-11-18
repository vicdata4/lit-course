import { expect, fixture, html } from '@open-wc/testing';
import '../components/holidays-info/holidays-info';
import { dates } from '../utils/data';
import { orderedList } from '../utils/functions';

describe('Table with data', () => {
  let el;

  before(async () => {
    el = await fixture(html`<holidays-info .list="${dates}" .nElements="${5}"></holidays-info>`);
    await el.updateComplete;
  });

  it('Table is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Default array length ok', async () => {
    const table = el.shadowRoot.querySelectorAll('tr');
    expect(table.length).equal(6);
  });

  it('Order list ok', async () => {
    const orderButton = el.shadowRoot.querySelectorAll('button.order')[0];
    orderButton.click();
    const newList = orderedList(dates, 'holidayFrom');
    expect(newList).to.eql(el.list);
  });

  it('Reverse list ok', async () => {
    const orderButton = el.shadowRoot.querySelectorAll('button.order')[0];
    orderButton.click();
    orderButton.click();
    const newList = orderedList(dates, 'name');
    const reverseList = orderedList(newList, 'name');
    expect(reverseList).to.eql(el.list);
  });
});

describe('Table pagination', () => {
  let el;

  before(async () => {
    const component = html` <holidays-info .list="${dates}" .nElements="${5}"></holidays-info> `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Show next page ok', async () => {
    const nextButton = el.shadowRoot.querySelector('.next');
    nextButton.click();
    expect(el.index).to.eql(1);
  });

  it('Pagination over index remains ok', async () => {
    expect(el.index).equal(1);
  });

  it('Index equal 0 show same page ok', async () => {
    const prevButton = el.shadowRoot.querySelector('.prev');
    prevButton.click();
    expect(el.index).equal(0);
  });

  it('Number of pages ok', async () => {
    const stepper = Math.ceil(dates.length / 5);
    expect(stepper).equal(el.stepper.length);
  });

  it('Number buttons ok', async () => {
    const nextButton = el.shadowRoot.getElementById('_0');
    nextButton.click();
    expect(el.index).equal(0);
  });
});
