import { expect, fixture, html } from '@open-wc/testing';
import '../components/reporte-pe/reporte-pe';

describe('Reporte-pe tests with data', () => {
  let el;
  const data = [
    { dia: new Date(2030, 0, 20), tipoPermiso: 'c formación', horas: '4' },
    { dia: new Date(1990, 10, 25), tipoPermiso: 'd baja medica', horas: '8' },
    { dia: new Date(2021, 9, 2), tipoPermiso: 'e formación', horas: '10' },
    { dia: new Date(2019, 8, 1), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2019, 8, 1), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2019, 8, 1), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2019, 8, 1), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2019, 8, 1), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2019, 8, 1), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2019, 8, 1), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2019, 8, 1), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2020, 11, 24), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2030, 0, 20), tipoPermiso: 'c formación', horas: '4' },
    { dia: new Date(1990, 10, 25), tipoPermiso: 'd baja medica', horas: '8' },
    { dia: new Date(2021, 9, 2), tipoPermiso: 'e formación', horas: '10' },
    { dia: new Date(2019, 8, 1), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2019, 8, 1), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2019, 8, 1), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2019, 8, 1), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2019, 8, 1), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2019, 8, 1), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2019, 8, 1), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2019, 8, 1), tipoPermiso: 'a formación', horas: '10' },
    { dia: new Date(2020, 11, 24), tipoPermiso: 'a formación', horas: '10' },
  ];
  const dataEmployees = [
    { nombre: 'Natanael Beniamin Cioarba', id_empleado: 'EMP_301' },
    { nombre: 'Rosario Gamonal', id_empleado: 'EMP_302' },
    { nombre: 'Abel Lawfa awfawfa', id_empleado: 'EMP_303' },
    { nombre: 'Juan del Castillo', id_empleado: 'EMP_304' },
  ];

  before(async () => {
    const component = html` <reporte-pe .empleadosRpe="${dataEmployees}"></reporte-pe> `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Component renderred correctly', async () => {
    el.datosReporteRpe = [];
    await el.updateComplete;
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Table without data not rendered ', async () => {
    let controlErrors = false;
    const buttonForm = el.shadowRoot.querySelectorAll('#button_subit_pe')[0];
    const selectEmployees = el.shadowRoot.getElementById('id_select_empleados_rpe');
    const contentDivErrors = el.shadowRoot.getElementById('id_final_errors_rpe');
    selectEmployees.querySelectorAll('option')[1].selected = true;
    el.shadowRoot.getElementById('id_start_date_rpe').value = '2020-10-15';
    el.shadowRoot.getElementById('id_end_date_rpe').value = '2020-10-15';

    buttonForm.click();
    await el.updateComplete;

    if (contentDivErrors.textContent.length === 0) {
      controlErrors = true;
    }

    expect(controlErrors).equal(false);
  });

  it('Table with reporte renderred correctly', async () => {
    const buttonForm = el.shadowRoot.querySelectorAll('#button_subit_pe')[0];
    const selectEmployees = el.shadowRoot.getElementById('id_select_empleados_rpe');
    selectEmployees.querySelectorAll('option')[1].selected = true;
    el.datosReporteRpe = data;

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
    expect(errorsSelectEmploye).equal(false);
  });

  it('Functions table order (Día, Tipo de Permiso) ascendent and descendent correctly', async () => {
    let controlErrors = false;
    const buttonOrderByDia = el.shadowRoot.querySelectorAll('th')[0];
    const buttonOrderByTipoPermiso = el.shadowRoot.querySelectorAll('th')[1];

    let previousData = el.datosReporteRpe;
    buttonOrderByDia.click();
    await el.updateComplete;
    if (JSON.stringify(previousData) === JSON.stringify(el.datosReporteRpe)) {
      controlErrors = true;
    }

    previousData = el.datosReporteRpe;
    buttonOrderByDia.click();
    await el.updateComplete;
    if (JSON.stringify(previousData) === JSON.stringify(el.datosReporteRpe)) {
      controlErrors = true;
    }

    previousData = el.datosReporteRpe;
    buttonOrderByTipoPermiso.click();
    await el.updateComplete;
    if (JSON.stringify(previousData) === JSON.stringify(el.datosReporteRpe)) {
      controlErrors = true;
    }

    previousData = el.datosReporteRpe;
    buttonOrderByTipoPermiso.click();
    await el.updateComplete;
    if (JSON.stringify(previousData) === JSON.stringify(el.datosReporteRpe)) {
      controlErrors = true;
    }
    expect(controlErrors).equal(false);
  });

  it('Tests steper reporte pe', async () => {
    let controlErrors = false;

    const buttonForm = el.shadowRoot.querySelectorAll('#button_subit_pe')[0];
    const selectEmployees = el.shadowRoot.getElementById('id_select_empleados_rpe');
    selectEmployees.querySelectorAll('option')[1].selected = true;
    el.shadowRoot.getElementById('id_start_date_rpe').value = '2017-10-15';
    el.shadowRoot.getElementById('id_end_date_rpe').value = '2020-01-22';

    buttonForm.click();
    el.datosReporteRpe = data;
    await el.updateComplete;
    if (el.datosReporteRpe.length !== 24) {
      controlErrors = true;
    }
    expect(controlErrors).equal(false);
  });

  it('Control errors reporte form succes', async () => {
    let controlErrors = false;
    const buttonForm = el.shadowRoot.querySelectorAll('#button_subit_pe')[0];
    const selectEmployees = el.shadowRoot.getElementById('id_select_empleados_rpe');
    const contentDivErrors = el.shadowRoot.getElementById('id_final_errors_rpe');
    selectEmployees.querySelectorAll('option')[1].selected = true;
    el.shadowRoot.getElementById('id_start_date_rpe').value = '2017-10-15';
    el.shadowRoot.getElementById('id_end_date_rpe').value = '2020-01-22';

    buttonForm.click();
    await el.updateComplete;

    if (contentDivErrors.textContent.length !== 0) {
      controlErrors = true;
    }

    expect(controlErrors).equal(false);
  });

  it('Control errors reporte form fail', async () => {
    let controlErrors = false;
    const buttonForm = el.shadowRoot.querySelectorAll('#button_subit_pe')[0];
    const selectEmployees = el.shadowRoot.getElementById('id_select_empleados_rpe');
    const contentDivErrors = el.shadowRoot.getElementById('id_final_errors_rpe');
    selectEmployees.querySelectorAll('option')[0].selected = true;
    el.shadowRoot.getElementById('id_start_date_rpe').value = '20172-10-15';
    el.shadowRoot.getElementById('id_end_date_rpe').value = '20202-01-22';

    buttonForm.click();
    await el.updateComplete;

    if (contentDivErrors.textContent.length === 0) {
      controlErrors = true;
    }

    expect(controlErrors).equal(false);
  });

  it('Control errors dataInit > dataEnd form fail', async () => {
    let controlErrors = false;
    const buttonForm = el.shadowRoot.querySelectorAll('#button_subit_pe')[0];
    const selectEmployees = el.shadowRoot.getElementById('id_select_empleados_rpe');
    const contentDivErrors = el.shadowRoot.getElementById('id_final_errors_rpe');
    selectEmployees.querySelectorAll('option')[1].selected = true;
    el.shadowRoot.getElementById('id_start_date_rpe').value = '2030-10-15';
    el.shadowRoot.getElementById('id_end_date_rpe').value = '2018-01-22';

    buttonForm.click();
    await el.updateComplete;

    if (contentDivErrors.textContent.length === 0) {
      controlErrors = true;
    }

    expect(controlErrors).equal(false);
  });

  it('Control errors dataInit = dataEnd form fail', async () => {
    let controlErrors = false;
    const buttonForm = el.shadowRoot.querySelectorAll('#button_subit_pe')[0];
    const selectEmployees = el.shadowRoot.getElementById('id_select_empleados_rpe');
    const contentDivErrors = el.shadowRoot.getElementById('id_final_errors_rpe');
    selectEmployees.querySelectorAll('option')[1].selected = true;
    el.shadowRoot.getElementById('id_start_date_rpe').value = '2020-10-15';
    el.shadowRoot.getElementById('id_end_date_rpe').value = '2020-10-15';

    buttonForm.click();
    await el.updateComplete;

    if (contentDivErrors.textContent.length === 0) {
      controlErrors = true;
    }

    expect(controlErrors).equal(false);
  });

  it('Control errors dataInit and dataEnd = null form succes', async () => {
    let controlErrors = false;
    const buttonForm = el.shadowRoot.querySelectorAll('#button_subit_pe')[0];
    const selectEmployees = el.shadowRoot.getElementById('id_select_empleados_rpe');
    const contentDivErrors = el.shadowRoot.getElementById('id_final_errors_rpe');
    selectEmployees.querySelectorAll('option')[1].selected = true;
    el.shadowRoot.getElementById('id_start_date_rpe').value = '';
    el.shadowRoot.getElementById('id_end_date_rpe').value = '';

    buttonForm.click();
    await el.updateComplete;

    if (contentDivErrors.textContent.length !== 0) {
      controlErrors = true;
    }

    expect(controlErrors).equal(false);
  });
});
