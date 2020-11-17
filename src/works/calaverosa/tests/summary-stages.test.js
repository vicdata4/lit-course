import { expect, fixture, html } from '@open-wc/testing';
import '../summary-stages/summary-stages.js';
import { datos } from '../utils/datos.js';

describe('Table with data', () => {
  let el, table;

  before(async () => {
    el = await fixture(html`<summary-stages .data="${datos}"></summary-stages>`);
    await el.updateComplete;

    table = el.shadowRoot.querySelectorAll('tr');
  });

  it('Table is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Default array length ok', async () => {
    expect(table.length).equal(el.data.length + 1);
  });

  it('Add new stage correctly ok', async () => {
    const newStage = el.shadowRoot.querySelector('#add');
    newStage.value = 'Nueva categoria';
    if (newStage !== '') {
      const addBtn = el.shadowRoot.querySelector('button');
      addBtn.click();
      await el.updateComplete;
      return el.data.length + 2;
    }
    expect(table.length).equal(11);
  });
});
