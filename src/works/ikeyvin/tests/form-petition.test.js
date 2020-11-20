import { expect, fixture, html } from '@open-wc/testing';
import '../components/form-petition.js';

describe('Petition form test: ', () => {
  let el, addBtn, deleteBtn, updateBtn, title, description, postPetition, inputCandidate, inputClient;

  before(async () => {
    el = await fixture(html`<form-petition></form-petition>`);
    await el.updateComplete;
    title = el.shadowRoot.querySelector('#peticionTitulo');
    description = el.shadowRoot.querySelector('#peticionDescripcion');
    postPetition = el.shadowRoot.querySelector('#peticionPublicar');
    inputClient = el.shadowRoot.querySelector('#cliPet');
    inputCandidate = el.shadowRoot.querySelector('#candiPet');
    addBtn = el.shadowRoot.querySelector('#addBtn');
    deleteBtn = el.shadowRoot.querySelector('#deleteBtn');
    updateBtn = el.shadowRoot.querySelector('#updateBtn');
  });

  it('Form petition is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Default properties', async () => {
    expect(el.message).equal('');
  });

  it('Form petition with no values, alert message appears', async () => {
    addBtn.click();
    await el.updateComplete;

    let message = el.shadowRoot.querySelector('.alertMessage');
    expect(message).not.to.be.null;
    expect(el.message).to.equal('¡Título y Descripción no debe estar vacío!');

    deleteBtn.click();
    await el.updateComplete;

    message = el.shadowRoot.querySelector('.alertMessage');
    expect(message).not.to.be.null;
    expect(el.message).to.equal('¡Seleciona una petición!');

    updateBtn.click();
    await el.updateComplete;

    message = el.shadowRoot.querySelector('.alertMessage');
    expect(message).not.to.be.null;
    expect(el.message).to.equal('¡Seleciona una petición!');
  });

  it('Form petition with values success!', async () => {
    title.value = 'Titulo 1';
    description.value = 'Description 1';
    postPetition.checked = true;
    inputCandidate.value = 'Candidato 1';
    inputClient.value = '';

    addBtn.click();
    await el.updateComplete;

    expect(el.message).to.equal('');

    title.value = 'Titulo 2';
    description.value = '';
    postPetition.checked = true;
    inputCandidate.value = 'Candidato 2';
    inputClient.value = '';

    addBtn.click();
    await el.updateComplete;

    expect(el.message).to.equal('¡Título y Descripción no debe estar vacío!');

    title.value = 'Titulo 3';
    description.value = 'Description 3';
    postPetition.checked = true;
    inputCandidate.value = 'Candidato 3';
    inputClient.value = 'Cliente 3';

    addBtn.click();
    await el.updateComplete;

    expect(el.message).to.equal('');

    title.value = '';
    description.value = '';
    postPetition.checked = true;
    inputCandidate.value = 'Candidato 1';
    inputClient.value = '';

    addBtn.click();
    await el.updateComplete;

    expect(el.message).to.equal('¡Título y Descripción no debe estar vacío!');
  });
});
