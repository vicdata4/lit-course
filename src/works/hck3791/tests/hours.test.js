import { expect, fixture, html } from '@open-wc/testing';
import '../components/hours-component';
import { hours, months, projects, years } from './data-test';

describe('Hours test', () => {
  let el, optionEmp, optionPro, optionYear, generate;
  let table, rows, cells;

  before(async () => {
    const component = html`<hours-component
      .data=${hours}
      .months=${months}
      .projects=${projects}
      .years=${years}
    ></hours-component>`;

    el = await fixture(component);
    await el.updateComplete;
    optionEmp = el.shadowRoot.getElementById('employees');
    optionPro = el.shadowRoot.getElementById('projects');
    optionYear = el.shadowRoot.getElementById('years');
    generate = el.shadowRoot.getElementById('generate');
    table = el.shadowRoot.querySelector('TABLE');
    rows = table.querySelectorAll('TR');
  });

  it('Component rendered', async () => {
    await el.updateComplete;
    cells = rows[0].querySelectorAll('TH');
    expect(el.shadowRoot).not.to.be.null;
    expect(rows.length).to.equal(13);
    expect(cells.length).to.equal(7);
  });

  it('Generate report - Data', async () => {
    optionEmp.value = 'Employee 1';
    optionPro.value = 'Project 1';
    optionYear.value = '2020';
    generate.click();
    await el.updateComplete;
    cells = rows[1].querySelectorAll('TD');
    expect(cells[0].innerText).equal('Enero');
    expect(cells[1].innerText).equal('100');
  });

  it('Generate report - No data', async () => {
    optionEmp.value = 'default';
    optionPro.value = 'default';
    optionYear.value = 'default';
    generate.click();
    await el.updateComplete;
    cells = table.querySelectorAll('TD');
    let count = 0;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === '') {
        count++;
      }
    }
    expect(count).equal(0);
  });

  it('Generate report - No hours', async () => {
    optionEmp.value = 'Employee 1';
    optionPro.value = 'Project 1';
    optionYear.value = '2022';
    generate.click();
  });
});
