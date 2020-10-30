import { expect, fixture, html } from '@open-wc/testing';
import '../components/reporte-pe/reporte-pe';

describe('Reporte-pe tests with data', () => {
  let el;

  const data = [
    { dia: new Date(2030, 0, 20), tipoPermiso: 'A formación', horas: '4' },
    { dia: new Date(1990, 11, 25), tipoPermiso: 'X baja medica', horas: '8' },
    { dia: new Date(2021, 9, 2), tipoPermiso: 'B formación', horas: '10' },
    { dia: new Date(1990, 10, 25), tipoPermiso: 'I baja medica', horas: '8' },
  ];

  const dataEmployees = [
    { nombre: 'Natanael Beniamin Cioarba', id_empleado: 'EMP_301' },
    { nombre: 'Rosario Gamonal', id_empleado: 'EMP_302' },
    { nombre: 'Abel Lawfa awfawfa', id_empleado: 'EMP_303' },
    { nombre: 'Juan del Castillo', id_empleado: 'EMP_304' },
  ];

  before(async () => {
    const component = html` <reporte-pe .datosReporteRpe="${data}" .empleadosRpe="${dataEmployees}"></reporte-pe> `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Component renderred correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Table with reporte renderred correctly', async () => {
    const buttonForm = el.shadowRoot.querySelectorAll('#button_subit_pe')[0];
    const selectEmployees = el.shadowRoot.getElementById('id_select_empleados_rpe');
    selectEmployees.querySelectorAll('option')[1].selected;
    buttonForm.click();
    await el.updateComplete;

    expect(parseInt(el.shadowRoot.querySelectorAll('.tableRpe')[0].querySelectorAll('label')[6].textContent)).equal(4);
  });

  it('Select Employees rendered corectly with data', async () => {
    const buttonForm = el.shadowRoot.querySelectorAll('#button_subit_pe')[0];
    const selectEmployees = el.shadowRoot.getElementById('id_select_empleados_rpe');
    buttonForm.click();
    await el.updateComplete;
    let errorsSelectEmploye = false;
    if (selectEmployees.querySelectorAll('option')[1].text !== 'Natanael Beniamin Cioarba') {
      errorsSelectEmploye = true;
    }
    if (selectEmployees.querySelectorAll('option')[4].text !== 'Juan del Castillo') {
      errorsSelectEmploye = true;
    }
    if (parseInt(selectEmployees.querySelectorAll('option')[0].value) !== -1) {
      errorsSelectEmploye = true;
    }
    if (selectEmployees.querySelectorAll('option')[1].value !== 'EMP_301') {
      errorsSelectEmploye = true;
    }
    if (selectEmployees.querySelectorAll('option')[4].value !== 'EMP_304') {
      errorsSelectEmploye = true;
    }
    if (selectEmployees.querySelectorAll('option').length !== 5) {
      errorsSelectEmploye = true;
    }
    expect(false).equal(errorsSelectEmploye);
  });

  it('Functions table order (Día, Tipo de Permiso) ascendent and descendent correctly', async () => {
    let controlErrors = false;
    const buttonOrder = el.shadowRoot.querySelectorAll('.campoOrdenar')[0];
    const buttonOrderTipoPermiso = el.shadowRoot.querySelectorAll('.campoOrdenar')[1];
    buttonOrder.click();
    await el.updateComplete;

    const dataOrderedAscendentDia = [
      { dia: new Date(1990, 10, 25), tipoPermiso: 'I baja medica', horas: '8' },
      { dia: new Date(1990, 11, 25), tipoPermiso: 'X baja medica', horas: '8' },
      { dia: new Date(2021, 9, 2), tipoPermiso: 'B formación', horas: '10' },
      { dia: new Date(2030, 0, 20), tipoPermiso: 'A formación', horas: '4' },
    ];
    if (JSON.stringify(el.datosReporteRpe) !== JSON.stringify(dataOrderedAscendentDia)) {
      controlErrors = true;
    }

    buttonOrder.click();
    await el.updateComplete;
    const dataOrderedDescendentDia = [
      { dia: new Date(2030, 0, 20), tipoPermiso: 'A formación', horas: '4' },
      { dia: new Date(2021, 9, 2), tipoPermiso: 'B formación', horas: '10' },
      { dia: new Date(1990, 11, 25), tipoPermiso: 'X baja medica', horas: '8' },
      { dia: new Date(1990, 10, 25), tipoPermiso: 'I baja medica', horas: '8' },
    ];
    if (JSON.stringify(el.datosReporteRpe) !== JSON.stringify(dataOrderedDescendentDia)) {
      controlErrors = true;
    }

    buttonOrderTipoPermiso.click();
    await el.updateComplete;
    const dataOrderedAscendentTipoPermiso = [
      { dia: new Date(2030, 0, 20), tipoPermiso: 'A formación', horas: '4' },
      { dia: new Date(2021, 9, 2), tipoPermiso: 'B formación', horas: '10' },
      { dia: new Date(1990, 10, 25), tipoPermiso: 'I baja medica', horas: '8' },
      { dia: new Date(1990, 11, 25), tipoPermiso: 'X baja medica', horas: '8' },
    ];
    if (JSON.stringify(el.datosReporteRpe) !== JSON.stringify(dataOrderedAscendentTipoPermiso)) {
      controlErrors = true;
    }

    buttonOrderTipoPermiso.click();
    await el.updateComplete;
    const dataOrderedDescendentTipoPermiso = [
      { dia: new Date(1990, 11, 25), tipoPermiso: 'X baja medica', horas: '8' },
      { dia: new Date(1990, 10, 25), tipoPermiso: 'I baja medica', horas: '8' },
      { dia: new Date(2021, 9, 2), tipoPermiso: 'B formación', horas: '10' },
      { dia: new Date(2030, 0, 20), tipoPermiso: 'A formación', horas: '4' },
    ];
    if (JSON.stringify(el.datosReporteRpe) !== JSON.stringify(dataOrderedDescendentTipoPermiso)) {
      controlErrors = true;
    }

    expect(false).equal(controlErrors);
  });
});
