import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../components/VacationRequests/requests-table.js';

const tableTitles = [
  'Fecha de solicitud',
  'Fecha Inicio',
  'Fecha Fin',
  'Estado de la solicitud',
  'Fecha de Estado',
  'Eliminar',
];
const orderType = ['applicationD', 'startDate', 'endDate'];

const data = [
  {
    id: 0,
    currentDate: new Date('2020/09/16'),
    startDate: new Date('2020/01/12'),
    endDate: new Date('2020/01/20'),
    status: 'No Aprobado',
    statusDate: new Date('2020/09/16'),
  },
  {
    id: 1,
    currentDate: new Date('2020/08/15'),
    startDate: new Date('2020/09/13'),
    endDate: new Date('2020/09/28'),
    status: 'Pendiente de aprobación',
    statusDate: new Date('2020/08/17'),
  },
  {
    id: 2,
    currentDate: new Date('2020/08/15'),
    startDate: new Date('2020/09/11'),
    endDate: new Date('2020/09/27'),
    status: 'Pendiente de aprobación',
    statusDate: new Date('2020/08/17'),
  },
];

const component = html`<requests-table .tableTitles="${tableTitles}" .requestsList="${data}" .fromT="${0}" .toT="${4}">
</requests-table>`;
describe('Default properties and empty table', () => {
  let element;

  before(async () => {
    const component = html`<requests-table></requests-table>`;
    element = await fixture(component);
    await element.updateComplete;
  });

  it('Default properties', async () => {
    expect(element.tableTitles).to.eql(tableTitles);
    expect(element.orderType).to.eql(orderType);
    expect(element.toT).equal(0);
    expect(element.fromT).equal(0);
  });

  it('Empty table and array', () => {
    expect(element.shadowRoot).not.to.be.null;
    expect(element.requestsList.length).equal(0);
  });
});

describe('Table with data', async () => {
  let el;

  before(async () => {
    el = await fixture(component);
    await el.updateComplete;
  });

  it('Table is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
    expect(el.requestsList.length).equal(3);
  });
});

describe('Dispatch order func', () => {
  let element, orderButton;
  before(async () => {
    element = await fixture(component);
    await element.updateComplete;

    orderButton = element.shadowRoot.querySelectorAll('.icon');
  });

  it('Ascending order by endDate', async () => {
    const eventSpy = sinon.spy(element, 'dispatchEvent');
    orderButton[2].click();

    expect(eventSpy).calledOnce;
    expect(eventSpy.args[0][0].type).to.equal('order-dates');
    await element.updateComplete;

    expect(orderButton[2].value).equal('desc');

    await element.updateComplete;
  });

  it('Descending order by endDate', async () => {
    orderButton[2].click();
    await element.updateComplete;

    expect(orderButton[2].value).equal('asc');
  });
});

describe('Delete event', () => {
  let el, deleteButton;

  before(async () => {
    el = await fixture(component);
    await el.updateComplete;

    deleteButton = el.shadowRoot.querySelectorAll('.deleteB');
  });

  it('Dispatch "delete-date" event after click', async () => {
    const eventSpy = sinon.spy(el, 'dispatchEvent');
    deleteButton[0].click();

    expect(eventSpy).calledOnce;
    expect(eventSpy.args[0][0].type).to.equal('delete-date');
  });
});
