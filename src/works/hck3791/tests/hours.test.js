import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '../components/hours-component';

describe('Hours test', () => {
  let el;

  before(async () => {
    const component = html`<hours-component></hours-component>`;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Component rendered', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Generate report - All data', async () => {
    el.shadowRoot.getElementById('employees').value = 'Employee 1';
    el.shadowRoot.getElementById('project').value = 'Project 1';
    el.shadowRoot.getElementById('years').value = '2020';
    el.shadowRoot.querySelector('button').click();
  });

  it('Generate report - No data', async () => {
    el.shadowRoot.getElementById('employees').value = 'Employee 3';
    el.shadowRoot.getElementById('project').value = 'Project 3';
    el.shadowRoot.getElementById('years').value = '2024';
    el.shadowRoot.querySelector('button').click();
  });
});
