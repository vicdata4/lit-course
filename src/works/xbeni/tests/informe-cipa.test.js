import { expect, fixture, html } from '@open-wc/testing';
import '../components/informe-cipa/informe-cipa';

describe('Informe-cipa tests', () => {
  let el;
  const data = [
    {
      nombre: 'B PRUEBA',
      email: 'A mm@gmail.com',
      telefono: '1111111111',
      perfil: 'X programador',
      en_plantilla: false,
      fecha_ultima_actualizacion: new Date(2030, 3, 25),
      fechaVencimiento: null,
    },
    {
      nombre: 'A Luisa Ojeda',
      email: 'X lo@gmail.com',
      telefono: '3333333333',
      perfil: 'Z programador',
      en_plantilla: true,
      fecha_ultima_actualizacion: new Date(2035, 5, 5),
      fechaVencimiento: null,
    },
    {
      nombre: 'C Javier Hernande',
      email: 'C jehk@gmail.com',
      telefono: '645632111',
      perfil: 'E arquitecto devop',
      en_plantilla: false,
      fecha_ultima_actualizacion: new Date(2010, 5, 11),
      fechaVencimiento: null,
    },
    {
      nombre: 'D Rocio Canales',
      email: 'U Arocio.canales@alvea.es',
      telefono: '652488965',
      perfil: 'I programador',
      en_plantilla: true,
      fecha_ultima_actualizacion: new Date(2015, 2, 11),
      fechaVencimiento: null,
    },
  ];

  before(async () => {
    const component = html` <informe-cipa .datosCipa="${data}"></informe-cipa> `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Informe-cipa with empty data renderred correctly', async () => {
    let controlErrors = false;
    el.datosCipa = [];
    await el.updateComplete;

    const tdTableEmpty = el.shadowRoot.querySelectorAll('.tabla_cipa')[0].querySelectorAll('td');
    const trRows = el.shadowRoot.querySelectorAll('tr');

    if (parseInt(trRows.length) !== 1) {
      controlErrors = true;
    }
    if (parseInt(tdTableEmpty.length) !== 0) {
      controlErrors = true;
    }

    expect(controlErrors).equal(false);
  });

  it('Informe-cipa with data renderred correctly', async () => {
    await el.updateComplete;
    el.datosCipa = data;
    await el.updateComplete;
    let controlErrors = false;
    const rowsTableCipa = el.shadowRoot.querySelectorAll('tr');
    const tdTableCipa = el.shadowRoot.querySelectorAll('.tabla_cipa')[0].querySelectorAll('td');

    if (parseInt(rowsTableCipa.length) !== 5) {
      controlErrors = true;
    }
    if (parseInt(tdTableCipa.length) !== 32) {
      controlErrors = true;
    }

    expect(controlErrors).equal(false);
  });

  it('Function order all columns by selected option corectly', async () => {
    let controlErrors = false;

    const buttonOrderByName = el.shadowRoot.querySelectorAll('.campo_ordenar')[0];
    const buttonOrderByEmail = el.shadowRoot.querySelectorAll('.campo_ordenar')[1];
    const buttonOrderByPerfil = el.shadowRoot.querySelectorAll('.campo_ordenar')[2];
    const buttonOrderByFua = el.shadowRoot.querySelectorAll('.campo_ordenar')[4];

    let previousData = el.datosCipa;
    buttonOrderByName.click();
    await el.updateComplete;
    if (JSON.stringify(previousData) === JSON.stringify(el.datosCipa)) {
      controlErrors = true;
    }

    previousData = el.datosCipa;
    buttonOrderByEmail.click();
    await el.updateComplete;
    if (JSON.stringify(previousData) === JSON.stringify(el.datosCipa)) {
      controlErrors = true;
    }

    previousData = el.datosCipa;
    buttonOrderByPerfil.click();
    await el.updateComplete;
    if (JSON.stringify(previousData) === JSON.stringify(el.datosCipa)) {
      controlErrors = true;
    }

    previousData = el.datosCipa;
    buttonOrderByFua.click();
    await el.updateComplete;
    if (JSON.stringify(previousData) === JSON.stringify(el.datosCipa)) {
      controlErrors = true;
    }

    expect(controlErrors).equal(false);
  });

  it('Function CalcularFechaVencimiento return corectly date', async () => {
    expect(el.formatRequiredDate(new Date(2019, 3, 25))).equal('25/04/2019');
  });
});
