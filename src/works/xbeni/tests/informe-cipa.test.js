import { expect, fixture, html } from '@open-wc/testing';
import '../components/informe-cipa/informe-cipa';

describe('Informe-cipa tests', () => {
  let el;

  before(async () => {
    const component = html` <informe-cipa></informe-cipa> `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Informe-cipa with empty data renderred correctly', async () => {
    let controlErrors = false;
    el.datosCipa = [];
    await el.updateComplete;

    const bodysOrder = el.shadowRoot.querySelectorAll('.campo_ordenar');
    const svgsCipa = el.shadowRoot.querySelectorAll('.svg_cipa');
    const columnsTableCipa = el.shadowRoot.querySelectorAll('th');
    const labelsCipaEmpty = el.shadowRoot.querySelectorAll('.tabla_cipa')[0].querySelectorAll('label');
    const labelsOrderCipa = el.shadowRoot.querySelectorAll('.tabla_cipa')[0].querySelectorAll('.texto_campo_ordenar');
    const tdTableEmpty = el.shadowRoot.querySelectorAll('.tabla_cipa')[0].querySelectorAll('td');
    const trRows = el.shadowRoot.querySelectorAll('tr');

    if (parseInt(trRows.length) !== 1) {
      controlErrors = true;
    }
    if (parseInt(bodysOrder.length) !== 6) {
      controlErrors = true;
    }
    if (parseInt(svgsCipa.length) !== 6) {
      controlErrors = true;
    }
    if (parseInt(columnsTableCipa.length) !== 8) {
      controlErrors = true;
    }
    if (parseInt(labelsCipaEmpty.length) !== 14) {
      controlErrors = true;
    }
    if (parseInt(labelsOrderCipa.length) !== 6) {
      controlErrors = true;
    }
    if (parseInt(tdTableEmpty.length) !== 0) {
      controlErrors = true;
    }

    expect(controlErrors).equal(false);
  });

  it('Informe-cipa with data renderred correctly', async () => {
    const data = [
      {
        nombre: 'Z Javier Hernande',
        email: 'Z jehk@gmail.com',
        telefono: '645632111',
        perfil: 'arquitecto devop',
        en_plantilla: false,
        fecha_ultima_actualizacion: new Date(2020, 5, 11),
        fechaVencimiento: null,
      },
      {
        nombre: 'A Rocio Canales',
        email: 'A rocio.canales@alvea.es',
        telefono: '652488965',
        perfil: 'programador',
        en_plantilla: true,
        fecha_ultima_actualizacion: new Date(2030, 2, 11),
        fechaVencimiento: null,
      },
    ];
    el.datosCipa = data;
    await el.updateComplete;
    let controlErrors = false;
    const rowsTableCipa = el.shadowRoot.querySelectorAll('tr');
    const orderCampColumnsCipa = el.shadowRoot.querySelectorAll('.campo_ordenar');
    const svgsCipa = el.shadowRoot.querySelectorAll('.svg_cipa');
    const rowsTableCipa1 = el.shadowRoot.querySelectorAll('th');
    const labelTypeOrderCipa = el.shadowRoot
      .querySelectorAll('.tabla_cipa')[0]
      .querySelectorAll('.texto_campo_ordenar');
    const tdTableCipa = el.shadowRoot.querySelectorAll('.tabla_cipa')[0].querySelectorAll('td');

    if (parseInt(rowsTableCipa.length) !== 3) {
      controlErrors = true;
    }
    if (parseInt(orderCampColumnsCipa.length) !== 6) {
      controlErrors = true;
    }
    if (parseInt(svgsCipa.length) !== 6) {
      controlErrors = true;
    }
    if (parseInt(rowsTableCipa1.length) !== 8) {
      controlErrors = true;
    }
    if (parseInt(labelTypeOrderCipa.length) !== 6) {
      controlErrors = true;
    }
    if (parseInt(tdTableCipa.length) !== 16) {
      controlErrors = true;
    }

    expect(controlErrors).equal(false);
  });

  it('Function order all columns by selected option corectly', async () => {
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
    let controlErrors = false;
    el.datosCipa = data;
    await el.updateComplete;

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

  it('Function order show correctly type of order selected', async () => {
    let controlErrors = false;

    const buttonOrderName = el.shadowRoot.querySelectorAll('.campo_ordenar')[0];
    const labelName = el.shadowRoot.querySelectorAll('.texto_campo_ordenar')[0];
    const buttonOrderEmail = el.shadowRoot.querySelectorAll('.campo_ordenar')[1];
    const labelEmail = el.shadowRoot.querySelectorAll('.texto_campo_ordenar')[1];
    const buttonOrderPerfil = el.shadowRoot.querySelectorAll('.campo_ordenar')[2];
    const labelPerfil = el.shadowRoot.querySelectorAll('.texto_campo_ordenar')[2];
    const buttonOrderPlantilla = el.shadowRoot.querySelectorAll('.campo_ordenar')[3];
    const labelPlantilla = el.shadowRoot.querySelectorAll('.texto_campo_ordenar')[3];
    const buttonOrderFua = el.shadowRoot.querySelectorAll('.campo_ordenar')[4];
    const labelFua = el.shadowRoot.querySelectorAll('.texto_campo_ordenar')[4];

    buttonOrderName.click();
    await el.updateComplete;
    if (labelName.textContent !== 'ASC') {
      controlErrors = true;
    }
    buttonOrderName.click();
    await el.updateComplete;
    if (labelName.textContent !== 'DES') {
      controlErrors = true;
    }

    buttonOrderEmail.click();
    await el.updateComplete;
    if (labelEmail.textContent !== 'ASC') {
      controlErrors = true;
    }
    buttonOrderEmail.click();
    await el.updateComplete;
    if (labelEmail.textContent !== 'DES') {
      controlErrors = true;
    }

    buttonOrderPerfil.click();
    await el.updateComplete;
    if (labelPerfil.textContent !== 'ASC') {
      controlErrors = true;
    }
    buttonOrderPerfil.click();
    await el.updateComplete;
    if (labelPerfil.textContent !== 'DES') {
      controlErrors = true;
    }

    buttonOrderPlantilla.click();
    await el.updateComplete;
    if (labelPlantilla.textContent !== 'NO') {
      controlErrors = true;
    }
    buttonOrderPlantilla.click();
    await el.updateComplete;
    if (labelPlantilla.textContent !== 'SI') {
      controlErrors = true;
    }

    buttonOrderFua.click();
    await el.updateComplete;
    if (labelFua.textContent !== 'ASC') {
      controlErrors = true;
    }
    buttonOrderFua.click();
    await el.updateComplete;
    if (labelFua.textContent !== 'DES') {
      controlErrors = true;
    }

    expect(controlErrors).equal(false);
  });

  it('Function CalcularFechaVencimiento return corectly date', async () => {
    expect(el.formatRequiredDate(new Date(2019, 3, 25))).equal('25/04/2019');
  });
});
