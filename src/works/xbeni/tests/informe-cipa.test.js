import { expect, fixture, html } from '@open-wc/testing';
import '../components/informe-cipa/informe-cipa';

describe('Informe-cipa Empty data', () => {
  const dataEmpty = [];
  let el;

  before(async () => {
    const component = html` <informe-cipa .datosCipa="${dataEmpty}"></informe-cipa> `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Informe-cipa Empty renderred correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Default table length 1', async () => {
    const trRows = el.shadowRoot.querySelectorAll('tr');
    expect(trRows.length).equal(1);
  });

  it('Div body table rendered correctly', async () => {
    const bodyCipa = el.shadowRoot.querySelectorAll('#id_body_cipa');
    expect(bodyCipa.length).equal(1);
  });

  it('Table cipa body rendered correctly', async () => {
    const bodyTable = el.shadowRoot.querySelectorAll('.tabla_cipa');
    expect(bodyTable.length).equal(1);
  });

  it('Table Order camps rendered correctly', async () => {
    const bodysOrder = el.shadowRoot.querySelectorAll('.campo_ordenar');
    expect(bodysOrder.length).equal(6);
  });

  it('Table SVG Order camps rendered correctly', async () => {
    const svgsCipa = el.shadowRoot.querySelectorAll('.svg_cipa');
    expect(svgsCipa.length).equal(6);
  });

  it('Default table columns rendered correctly', async () => {
    const columnsTableCipa = el.shadowRoot.querySelectorAll('th');
    expect(columnsTableCipa.length).equal(8);
  });

  it('Table name Rows rendered correctly - label position order rendered correctly', async () => {
    const labelsCipaEmpty = el.shadowRoot.querySelectorAll('.tabla_cipa')[0].querySelectorAll('label');
    expect(labelsCipaEmpty.length).equal(14);
  });

  it('Table show position ordered rendered correctly', async () => {
    const labelsOrderCipa = el.shadowRoot.querySelectorAll('.tabla_cipa')[0].querySelectorAll('.texto_campo_ordenar');
    expect(labelsOrderCipa.length).equal(6);
  });

  it('Table rows 0 rendered correctly', async () => {
    const tdTableEmpty = el.shadowRoot.querySelectorAll('.tabla_cipa')[0].querySelectorAll('td');
    expect(tdTableEmpty.length).equal(0);
  });
});

describe('Informe-cipa With data', () => {
  const data = [
    {
      nombre: 'Z Javier Hernande',
      email: 'Z jehk@gmail.com',
      telefono: '645632111',
      perfil: 'arquitecto devop',
      en_plantilla: false,
      fecha_ultima_actualizacion: '11/06/2020',
      fechaVencimiento: null,
    },
    {
      nombre: 'A Rocio Canales',
      email: 'A rocio.canales@alvea.es',
      telefono: '652488965',
      perfil: 'programador',
      en_plantilla: true,
      fecha_ultima_actualizacion: '11/03/2030',
      fechaVencimiento: null,
    },
  ];
  let el;

  before(async () => {
    const component = html` <informe-cipa .datosCipa="${data}"></informe-cipa> `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Informe-cipa with data renderred correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Table rows renderred correctly', async () => {
    const rowsTableCipa = el.shadowRoot.querySelectorAll('tr');
    expect(rowsTableCipa.length).equal(3);
  });

  it('Div body table rendered correctly', async () => {
    const bodyCipa = el.shadowRoot.querySelectorAll('#id_body_cipa');
    expect(bodyCipa.length).equal(1);
  });

  it('Table cipa body rendered correctly', async () => {
    const bodyTableCipa = el.shadowRoot.querySelectorAll('.tabla_cipa');
    expect(bodyTableCipa.length).equal(1);
  });

  it('Table Order camps rendered correctly', async () => {
    const orderCampColumnsCipa = el.shadowRoot.querySelectorAll('.campo_ordenar');
    expect(orderCampColumnsCipa.length).equal(6);
  });

  it('Table SVG Order camps rendered correctly', async () => {
    const svgsCipa = el.shadowRoot.querySelectorAll('.svg_cipa');
    expect(svgsCipa.length).equal(6);
  });

  it('Default table columns rendered correctly', async () => {
    const rowsTableCipa = el.shadowRoot.querySelectorAll('th');
    expect(rowsTableCipa.length).equal(8);
  });

  it('Table show position ordered rendered correctly', async () => {
    const labelTypeOrderCipa = el.shadowRoot
      .querySelectorAll('.tabla_cipa')[0]
      .querySelectorAll('.texto_campo_ordenar');
    expect(labelTypeOrderCipa.length).equal(6);
  });

  it('Table rows with data rendered correctly', async () => {
    const tdTableCipa = el.shadowRoot.querySelectorAll('.tabla_cipa')[0].querySelectorAll('td');
    expect(tdTableCipa.length).equal(16);
  });

  it('Function order by name show text ASC', async () => {
    const buttonOrderByName = el.shadowRoot.querySelectorAll('.campo_ordenar')[0];
    buttonOrderByName.click();
    await el.updateComplete;
    const contentLabelOrderName = el.shadowRoot.querySelectorAll('.texto_campo_ordenar')[0].textContent;
    expect(contentLabelOrderName).equal('ASC');
  });
});

describe('Informe-cipa With data, tests order table correctly', () => {
  const data = [
    {
      nombre: 'B PRUEBA',
      email: 'A mm@gmail.com',
      telefono: '1111111111',
      perfil: 'X programador',
      en_plantilla: false,
      fecha_ultima_actualizacion: '25/04/2030',
      fechaVencimiento: null,
    },
    {
      nombre: 'A Luisa Ojeda',
      email: 'X lo@gmail.com',
      telefono: '3333333333',
      perfil: 'Z programador',
      en_plantilla: true,
      fecha_ultima_actualizacion: '05/06/2035',
      fechaVencimiento: null,
    },
    {
      nombre: 'C Javier Hernande',
      email: 'C jehk@gmail.com',
      telefono: '645632111',
      perfil: 'E arquitecto devop',
      en_plantilla: false,
      fecha_ultima_actualizacion: '11/06/2010',
      fechaVencimiento: null,
    },
    {
      nombre: 'D Rocio Canales',
      email: 'U Arocio.canales@alvea.es',
      telefono: '652488965',
      perfil: 'I programador',
      en_plantilla: true,
      fecha_ultima_actualizacion: '11/03/2015',
      fechaVencimiento: null,
    },
  ];
  let el;

  before(async () => {
    const component = html` <informe-cipa .datosCipa="${data}"></informe-cipa> `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Informe-cipa with data renderred correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Function order by name ordered table correctly', async () => {
    const buttonOrderByName = el.shadowRoot.querySelectorAll('.campo_ordenar')[0];
    buttonOrderByName.click();
    await el.updateComplete;

    const dataOrdered = [
      {
        nombre: 'A Luisa Ojeda',
        email: 'X lo@gmail.com',
        telefono: '3333333333',
        perfil: 'Z programador',
        en_plantilla: true,
        fecha_ultima_actualizacion: '05/06/2035',
        fechaVencimiento: null,
      },
      {
        nombre: 'B PRUEBA',
        email: 'A mm@gmail.com',
        telefono: '1111111111',
        perfil: 'X programador',
        en_plantilla: false,
        fecha_ultima_actualizacion: '25/04/2030',
        fechaVencimiento: null,
      },
      {
        nombre: 'C Javier Hernande',
        email: 'C jehk@gmail.com',
        telefono: '645632111',
        perfil: 'E arquitecto devop',
        en_plantilla: false,
        fecha_ultima_actualizacion: '11/06/2010',
        fechaVencimiento: null,
      },
      {
        nombre: 'D Rocio Canales',
        email: 'U Arocio.canales@alvea.es',
        telefono: '652488965',
        perfil: 'I programador',
        en_plantilla: true,
        fecha_ultima_actualizacion: '11/03/2015',
        fechaVencimiento: null,
      },
    ];
    expect(JSON.stringify(el.datosCipa)).equal(JSON.stringify(dataOrdered));
  });

  it('Function order by email ordered table correctly', async () => {
    const buttonOrderByName = el.shadowRoot.querySelectorAll('.campo_ordenar')[1];
    buttonOrderByName.click();
    await el.updateComplete;

    const dataOrdered = [
      {
        nombre: 'B PRUEBA',
        email: 'A mm@gmail.com',
        telefono: '1111111111',
        perfil: 'X programador',
        en_plantilla: false,
        fecha_ultima_actualizacion: '25/04/2030',
        fechaVencimiento: null,
      },
      {
        nombre: 'C Javier Hernande',
        email: 'C jehk@gmail.com',
        telefono: '645632111',
        perfil: 'E arquitecto devop',
        en_plantilla: false,
        fecha_ultima_actualizacion: '11/06/2010',
        fechaVencimiento: null,
      },
      {
        nombre: 'D Rocio Canales',
        email: 'U Arocio.canales@alvea.es',
        telefono: '652488965',
        perfil: 'I programador',
        en_plantilla: true,
        fecha_ultima_actualizacion: '11/03/2015',
        fechaVencimiento: null,
      },
      {
        nombre: 'A Luisa Ojeda',
        email: 'X lo@gmail.com',
        telefono: '3333333333',
        perfil: 'Z programador',
        en_plantilla: true,
        fecha_ultima_actualizacion: '05/06/2035',
        fechaVencimiento: null,
      },
    ];

    expect(JSON.stringify(el.datosCipa)).equal(JSON.stringify(dataOrdered));
  });

  it('Function order by perfil ordered table correctly', async () => {
    const buttonOrderByName = el.shadowRoot.querySelectorAll('.campo_ordenar')[2];
    buttonOrderByName.click();
    await el.updateComplete;

    const dataOrdered = [
      {
        nombre: 'C Javier Hernande',
        email: 'C jehk@gmail.com',
        telefono: '645632111',
        perfil: 'E arquitecto devop',
        en_plantilla: false,
        fecha_ultima_actualizacion: '11/06/2010',
        fechaVencimiento: null,
      },
      {
        nombre: 'D Rocio Canales',
        email: 'U Arocio.canales@alvea.es',
        telefono: '652488965',
        perfil: 'I programador',
        en_plantilla: true,
        fecha_ultima_actualizacion: '11/03/2015',
        fechaVencimiento: null,
      },
      {
        nombre: 'B PRUEBA',
        email: 'A mm@gmail.com',
        telefono: '1111111111',
        perfil: 'X programador',
        en_plantilla: false,
        fecha_ultima_actualizacion: '25/04/2030',
        fechaVencimiento: null,
      },
      {
        nombre: 'A Luisa Ojeda',
        email: 'X lo@gmail.com',
        telefono: '3333333333',
        perfil: 'Z programador',
        en_plantilla: true,
        fecha_ultima_actualizacion: '05/06/2035',
        fechaVencimiento: null,
      },
    ];

    expect(JSON.stringify(el.datosCipa)).equal(JSON.stringify(dataOrdered));
  });

  it('Function order by fecha ultima actualizacion ordered table correctly', async () => {
    const buttonOrderByName = el.shadowRoot.querySelectorAll('.campo_ordenar')[4];
    buttonOrderByName.click();
    await el.updateComplete;

    const dataOrdered = [
      {
        nombre: 'A Luisa Ojeda',
        email: 'X lo@gmail.com',
        telefono: '3333333333',
        perfil: 'Z programador',
        en_plantilla: true,
        fecha_ultima_actualizacion: '05/06/2035',
        fechaVencimiento: null,
      },
      {
        nombre: 'B PRUEBA',
        email: 'A mm@gmail.com',
        telefono: '1111111111',
        perfil: 'X programador',
        en_plantilla: false,
        fecha_ultima_actualizacion: '25/04/2030',
        fechaVencimiento: null,
      },
      {
        nombre: 'D Rocio Canales',
        email: 'U Arocio.canales@alvea.es',
        telefono: '652488965',
        perfil: 'I programador',
        en_plantilla: true,
        fecha_ultima_actualizacion: '11/03/2015',
        fechaVencimiento: null,
      },
      {
        nombre: 'C Javier Hernande',
        email: 'C jehk@gmail.com',
        telefono: '645632111',
        perfil: 'E arquitecto devop',
        en_plantilla: false,
        fecha_ultima_actualizacion: '11/06/2010',
        fechaVencimiento: null,
      },
    ];

    expect(JSON.stringify(el.datosCipa)).equal(JSON.stringify(dataOrdered));
  });
});

describe('Informe-cipa With data, label show correctly Position ordered', () => {
  const data = [
    {
      nombre: 'N PRUEBA',
      email: 'S mm@gmail.com',
      telefono: '1111111111',
      perfil: 'X programador',
      en_plantilla: false,
      fecha_ultima_actualizacion: '16/04/2030',
      fechaVencimiento: null,
    },
    {
      nombre: 'I Luisa Ojeda',
      email: 'X lo@gmail.com',
      telefono: '3333333333',
      perfil: 'A programador',
      en_plantilla: true,
      fecha_ultima_actualizacion: '05/06/2028',
      fechaVencimiento: null,
    },
    {
      nombre: 'C Javier Hernande',
      email: 'C jehk@gmail.com',
      telefono: '645632111',
      perfil: 'E arquitecto devop',
      en_plantilla: false,
      fecha_ultima_actualizacion: '11/06/2010',
      fechaVencimiento: null,
    },
    {
      nombre: 'D Rocio Canales',
      email: 'U Arocio.canales@alvea.es',
      telefono: '652488965',
      perfil: 'I programador',
      en_plantilla: true,
      fecha_ultima_actualizacion: '11/03/2015',
      fechaVencimiento: null,
    },
    {
      nombre: 'R Rocio Canales',
      email: 'S Arocio.canales@alvea.es',
      telefono: '652488965',
      perfil: 'H programador',
      en_plantilla: false,
      fecha_ultima_actualizacion: '11/03/2017',
      fechaVencimiento: null,
    },
  ];
  let el;

  before(async () => {
    const component = html` <informe-cipa .datosCipa="${data}"></informe-cipa> `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Informe-cipa with data renderred correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Function order by name show text ASC', async () => {
    const buttonOrder = el.shadowRoot.querySelectorAll('.campo_ordenar')[0];
    buttonOrder.click();
    await el.updateComplete;
    const contentLabelOrder = el.shadowRoot.querySelectorAll('.texto_campo_ordenar')[0].textContent;
    expect(contentLabelOrder).equal('ASC');
  });

  it('Function order by name show text DES', async () => {
    const buttonOrder = el.shadowRoot.querySelectorAll('.campo_ordenar')[0];
    buttonOrder.click();
    await el.updateComplete;
    const contentLabelOrder = el.shadowRoot.querySelectorAll('.texto_campo_ordenar')[0].textContent;
    expect(contentLabelOrder).equal('DES');
  });

  it('Function order by email show text ASC', async () => {
    const buttonOrder = el.shadowRoot.querySelectorAll('.campo_ordenar')[1];
    buttonOrder.click();
    await el.updateComplete;
    const contentLabelOrder = el.shadowRoot.querySelectorAll('.texto_campo_ordenar')[1].textContent;
    expect(contentLabelOrder).equal('ASC');
  });

  it('Function order by email show text DES', async () => {
    const buttonOrder = el.shadowRoot.querySelectorAll('.campo_ordenar')[1];
    buttonOrder.click();
    await el.updateComplete;
    const contentLabelOrder = el.shadowRoot.querySelectorAll('.texto_campo_ordenar')[1].textContent;
    expect(contentLabelOrder).equal('DES');
  });

  it('Function order by perfil show text ASC', async () => {
    const buttonOrder = el.shadowRoot.querySelectorAll('.campo_ordenar')[2];
    buttonOrder.click();
    await el.updateComplete;
    const contentLabelOrder = el.shadowRoot.querySelectorAll('.texto_campo_ordenar')[2].textContent;
    expect(contentLabelOrder).equal('ASC');
  });

  it('Function order by perfil show text DES', async () => {
    const buttonOrder = el.shadowRoot.querySelectorAll('.campo_ordenar')[2];
    buttonOrder.click();
    await el.updateComplete;
    const contentLabelOrder = el.shadowRoot.querySelectorAll('.texto_campo_ordenar')[2].textContent;
    expect(contentLabelOrder).equal('DES');
  });

  it('Function order by en plantilla show text NO', async () => {
    const buttonOrder = el.shadowRoot.querySelectorAll('.campo_ordenar')[3];
    buttonOrder.click();
    await el.updateComplete;
    const contentLabelOrder = el.shadowRoot.querySelectorAll('.texto_campo_ordenar')[3].textContent;
    expect(contentLabelOrder).equal('NO');
  });

  it('Function order by en plantilla show text SI', async () => {
    const buttonOrder = el.shadowRoot.querySelectorAll('.campo_ordenar')[3];
    buttonOrder.click();
    await el.updateComplete;
    const contentLabelOrder = el.shadowRoot.querySelectorAll('.texto_campo_ordenar')[3].textContent;
    expect(contentLabelOrder).equal('SI');
  });

  it('Function order by fecha ultima actualizacion show text ASC', async () => {
    const buttonOrder = el.shadowRoot.querySelectorAll('.campo_ordenar')[4];
    buttonOrder.click();
    await el.updateComplete;
    const contentLabelOrder = el.shadowRoot.querySelectorAll('.texto_campo_ordenar')[4].textContent;
    expect(contentLabelOrder).equal('ASC');
  });

  it('Function order by fecha ultima actualizacion show text DES', async () => {
    const buttonOrder = el.shadowRoot.querySelectorAll('.campo_ordenar')[4];
    buttonOrder.click();
    await el.updateComplete;
    const contentLabelOrder = el.shadowRoot.querySelectorAll('.texto_campo_ordenar')[4].textContent;
    expect(contentLabelOrder).equal('DES');
  });

  it('Function CalcularFechaVencimiento return corectly date', async () => {
    expect(el.calcularFechaVencimiento('25/04/2019')).equal('25/11/2020');
  });
});
