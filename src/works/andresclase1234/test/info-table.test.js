import { expect, fixture, html } from '@open-wc/testing';
import './holidays-info/holidays-info';
import { dates } from './utils/data';

describe('Table with data', () => {
  let el;

  before(async () => {
    el = await fixture(html`<holidays-info .list="${dates}" .nElements="${4}"></holidays-info>`);
    await el.updateComplete;
  });

  it('Table is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Default array length', async () => {
    const table = el.shadowRoot.querySelectorAll('tr');
    expect(table.length).equal(4);
  });
});
