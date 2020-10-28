import { expect, fixture, html } from '@open-wc/testing';
import '../components/hours-component';
import { hours, months, projects, years } from './data-test';

describe('Hours test', () => {
  let el;

  before(async () => {
    const component = html`<hours-component
      .data=${hours}
      .months=${months}
      .projects=${projects}
      .years=${years}
    ></hours-component>`;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Component rendered', async () => {
    await el.updateComplete;
    const rows = el.shadowRoot.querySelector('TABLE').querySelectorAll('TR');
    const cells = rows[0].querySelectorAll('TH');
    expect(el.shadowRoot).not.to.be.null;
    expect(rows.length).to.equal(13);
    expect(cells.length).to.equal(7);
  });

  it('Generate report - Data', async () => {
    el.shadowRoot.getElementById('employees').value = 'Employee 1';
    el.shadowRoot.getElementById('projects').value = 'Project 1';
    el.shadowRoot.getElementById('years').value = '2020';
    el.shadowRoot.getElementById('generate').click();
    await el.updateComplete;
    const table = el.shadowRoot.querySelector('TABLE');
    const rows = table.querySelectorAll('TR');
    const cells = rows[1].querySelectorAll('TD');
    expect(cells[0].innerText).equal('Enero');
    expect(cells[1].innerText).equal('100');
  });

  it('Generate report - No data', async () => {
    el.shadowRoot.getElementById('employees').value = 'default';
    el.shadowRoot.getElementById('projects').value = 'default';
    el.shadowRoot.getElementById('years').value = 'default';
    el.shadowRoot.getElementById('generate').click();
    await el.updateComplete;
    const table = el.shadowRoot.querySelector('TABLE');
    const cells = table.querySelectorAll('TD');
    let count = 0;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === '') {
        count++;
      }
    }
    expect(count).equal(0);
  });

  it('Generate report - No hours', async () => {
    el.shadowRoot.getElementById('employees').value = 'Employee 1';
    el.shadowRoot.getElementById('projects').value = 'Project 1';
    el.shadowRoot.getElementById('years').value = '2022';
    el.shadowRoot.getElementById('generate').click();
  });
});
