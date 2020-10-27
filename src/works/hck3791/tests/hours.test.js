import { expect, fixture, html } from '@open-wc/testing';
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
    await el.updateComplete;
    const table = el.shadowRoot.querySelectorAll('tr');
    expect(table.length).to.be.equal(13);
    const td = table[1].querySelectorAll('td');
    expect(td[0].innerText).to.be.equal('Enero');
    expect(td[1].innerText).to.be.equal('100');
    expect(td.length).to.be.equal(7);
  });

  it('Generate report - Wrong data', async () => {
    el.shadowRoot.getElementById('employees').value = 'Employee 1';
    el.shadowRoot.getElementById('project').value = 'Project 1';
    el.shadowRoot.getElementById('years').value = '2022';
    el.shadowRoot.querySelector('button').click();
  });

  it('Generate report - No data', async () => {
    el.shadowRoot.getElementById('employees').value = '';
    el.shadowRoot.getElementById('project').value = '';
    el.shadowRoot.getElementById('years').value = '';
    el.shadowRoot.querySelector('button').click();
  });
});
