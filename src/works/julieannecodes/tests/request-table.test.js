import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../VacationRequests/requests-table.js';

const tableTitles = [
  'Fecha de solicitud',
  'Fecha Inicio',
  'Fecha Fin',
  'Estado de la solicitud',
  'Fecha de Estado',
  'Eliminar',
];
const orderType = ['currentDate', 'startDate', 'endDate'];

const data = [
  {
    id: 0,
    currentDate: new Date('2020/09/16'),
    startDate: new Date('2020/12/15'),
    endDate: new Date('2020/01/12'),
    status: 'No Aprobado',
    statusDate: new Date('2020/09/16'),
  },
  {
    id: 1,
    currentDate: new Date('2020/08/15'),
    startDate: new Date('2020/09/11'),
    endDate: new Date('2020/09/22'),
    status: 'Pendiente de aprobación',
    statusDate: new Date('2020/08/17'),
  },
  {
    id: 2,
    currentDate: new Date('2020/08/15'),
    startDate: new Date('2020/09/11'),
    endDate: new Date('2020/09/10'),
    status: 'Pendiente de aprobación',
    statusDate: new Date('2020/08/17'),
  },
];

const sortedData = [
  {
    id: 0,
    currentDate: new Date('2020/09/16'),
    startDate: new Date('2020/12/15'),
    endDate: new Date('2020/01/12'),
    status: 'No Aprobado',
    statusDate: new Date('2020/09/16'),
  },
  {
    id: 2,
    currentDate: new Date('2020/08/15'),
    startDate: new Date('2020/09/11'),
    endDate: new Date('2020/09/10'),
    status: 'Pendiente de aprobación',
    statusDate: new Date('2020/08/17'),
  },
  {
    id: 1,
    currentDate: new Date('2020/08/15'),
    startDate: new Date('2020/09/11'),
    endDate: new Date('2020/09/22'),
    status: 'Pendiente de aprobación',
    statusDate: new Date('2020/08/17'),
  },
];

describe('Default properties and table rendering', () => {
  let element;

  before(async () => {
    const component = html`<requests-table></requests-table>`;
    element = await fixture(component);
    await element.updateComplete;
  });

  it('Default properties', async () => {
    expect(element.sortedArray.length).equal(0);
    expect(...element.tableTitles).equal(...tableTitles);
    expect(...element.orderType).equal(...orderType);
    expect(element.toT).equal(0);
    expect(element.fromT).equal(0);
  });

  it('Table with data', () => {
    let element;

    before(async () => {
      const component = html`<requests-table .tableTitles="${tableTitles}" .requestsList="${data}"></requests-table>`;

      element = await fixture(component);
      await element.updateComplete;
    });
  });
});

describe('Order func', () => {
  let element, orderButton;

  before(async () => {
    element = await fixture(
      html`<requests-table .tableTitles="${tableTitles}" .requestsList="${data}"></requests-table>`,
    );
    await element.updateComplete;

    orderButton = element.shadowRoot.querySelectorAll('.order');
  });

  it('Ascending order', async () => {
    const arr = orderButton;
    arr[2].click();
    await element.updateComplete;
    expect(...element.requestsList.map((item) => item.id)).equal(...sortedData.map((x) => x.id));
    expect(arr[2].value).equal('desc');
  });

  it('Descending order', async () => {
    const arr = orderButton;
    const arrReversed = [...data.reverse()];
    arr[2].click();
    await element.updateComplete;

    expect(...element.requestsList.map((item) => item.id)).equal(...arrReversed.map((x) => x.id));
    expect(arr[2].value).equal('asc');
  });
});

describe('Delete event', () => {
  let el, deleteButton;

  before(async () => {
    el = await fixture(html`<requests-table
      .tableTitles="${tableTitles}"
      .requestsList="${data}"
      .fromT="${0}"
      .toT="${2}"
    >
    </requests-table>`);
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
