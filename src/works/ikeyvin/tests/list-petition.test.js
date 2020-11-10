import { expect, fixture, html } from '@open-wc/testing';
import '../components/list-petition.js';

const data = [
  {
    id: new Date().valueOf(),
    titulo: 'Titulo 1',
    descripcion: 'Descripcion 1',
    fecha: new Date(),
    publicar: true,
  },
  {
    id: new Date().valueOf(),
    titulo: 'Titulo 2',
    descripcion: 'Descripcion 2',
    fecha: new Date(),
    publicar: true,
  },
  {
    id: new Date().valueOf(),
    titulo: 'Titulo 3',
    descripcion: 'Descripcion 3',
    fecha: new Date(),
    publicar: false,
  },
  {
    id: new Date().valueOf(),
    titulo: 'Titulo 4',
    descripcion: 'Descripcion 4',
    fecha: new Date(),
    publicar: true,
  },
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
    el.listaPeticiones = [];
    await el.updateComplete;
    const list = el.shadowRoot.querySelectorAll('tr');
    expect(list.length).equal(1);
  });
});

describe('List petition with data: ', () => {
  let el, showPopupPetition, closePopupPetition;

  before(async () => {
    const component = html`<list-petition .listaPeticiones="${data}"></list-petition>`;

    el = await fixture(component);
    await el.updateComplete;

    showPopupPetition = el.shadowRoot.querySelector('a');
  });

  it('List is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('When click title, popup windows appears', async () => {
    showPopupPetition.click();
    await el.updateComplete;

    const modalWindow = el.shadowRoot.querySelector('.modal');

    expect(modalWindow).not.to.be.null;
  });

  it('Correct values on modal window', async () => {
    showPopupPetition.click();
    await el.updateComplete;

    const modalWindow = el.shadowRoot.querySelector('.modal');

    expect(modalWindow).not.to.be.null;

    const title = el.shadowRoot.querySelector('#modalTitulo');
    const date = el.shadowRoot.querySelector('#modalFecha');
    const description = el.shadowRoot.querySelector('#modalDescripcion');

    expect(title).not.to.be.null;
    expect(date).not.to.be.null;
    expect(date).not.to.be.NaN;
    expect(description).not.to.be.null;
  });

  it('Close button modal windows working', async () => {
    showPopupPetition.click();
    await el.updateComplete;

    closePopupPetition = el.shadowRoot.querySelector('span');
    closePopupPetition.click();
    await el.updateComplete;
  });
});
