import { expect, fixture, html } from '@open-wc/testing';
import '../petitions-visualization';
import { petitions } from '../petitions-test';

describe('petitions visualization test', () => {
  let el, rows, cells;

  before(async () => {
    const component = html`<petitions-visualization .pets=${petitions}></petitions-visualization>`;
    el = await fixture(component);
    rows = el.shadowRoot.querySelectorAll('TR');
    cells = rows[1].querySelectorAll('TD');
  });

  it('Number of row/cells', async () => {
    expect(rows.length).to.equal(6);
    expect(cells.length).to.equal(2);
  });
  it('Generate links', async () => {
    const link = cells[0].firstChild;
    expect(link.nodeName).to.equal('A');
    expect(link.getAttribute('href')).to.not.equal('');
  });
});
