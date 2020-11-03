import { expect, fixture, html } from '@open-wc/testing';
import '../components/list-petition.js';

const data = [
  { id: new Date().valueOf(), titulo: 'Titulo 1', descripcion: 'Descripcion 1', fecha: '13/10/2020', publicar: true },
  { id: new Date().valueOf(), titulo: 'Titulo 2', descripcion: 'Descripcion 2', fecha: '14/11/2020', publicar: true },
  { id: new Date().valueOf(), titulo: 'Titulo 3', descripcion: 'Descripcion 3', fecha: '24/11/2020', publicar: false },
];

describe('Empty list petition: ', () => {
  let el;

  before(async () => {
    el = await fixture(html`<list-petition></list-petition>`);
    await el.updateComplete;
  });

  it('Empty list petition is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Default array length', async () => {
    const list = el.shadowRoot.querySelectorAll('li');
    expect(list.length).equal(0);
  });
});

describe('List petition with data: ', () => {
  let el;

  before(async () => {
    const component = html`<list-petition .listaPeticiones="${data}"></list-petition>`;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('List is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });
});
