import { expect, fixture, html } from '@open-wc/testing';
import '../components/form-petition.js';

describe('Petition form test: ', () => {
  let el, submitBtn, title, description, postPetition;

  before(async () => {
    el = await fixture(html`<form-petition></form-petition>`);
    await el.updateComplete;
    submitBtn = el.shadowRoot.querySelector('button');
    title = el.shadowRoot.querySelector('#peticionTitulo');
    description = el.shadowRoot.querySelector('#peticionDescripcion');
    postPetition = el.shadowRoot.querySelector('#peticionPublicar');
  });

  it('Form petition is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Default properties', async () => {
    expect(el.listaPeticion).to.have.lengthOf(0);
    expect(el.message).equal('');
  });

  it('Alert message is not visible', async () => {
    const message = el.shadowRoot.querySelector('p .alertMessage');
    expect(message).to.be.null;
  });

  it('Form petition with no values, alert message appears', async () => {
    submitBtn.click();
    await el.updateComplete;

    const message = el.shadowRoot.querySelector('.alertMessage');
    expect(message).not.to.be.null;
    expect(el.message).to.equal('TITULO y DESCRIPCIÓN no debe estar vacío!');
  });

  it('Form petition with values success!', async () => {
    title.value = 'Titulo 1';
    description.value = 'Description 1';
    postPetition.checked = true;

    submitBtn.click();
    await el.updateComplete;

    expect(el.listaPeticion).to.have.lengthOf(1);
    expect(el.message).to.equal('');

    title.value = 'Titulo 2';
    description.value = '';
    postPetition.checked = true;

    submitBtn.click();
    await el.updateComplete;

    expect(el.listaPeticion).to.have.lengthOf(1);
    expect(el.message).to.equal('TITULO y DESCRIPCIÓN no debe estar vacío!');

    title.value = 'Titulo 3';
    description.value = 'Description 3';
    postPetition.checked = true;

    submitBtn.click();
    await el.updateComplete;

    expect(el.listaPeticion).to.have.lengthOf(2);
    expect(el.message).to.equal('');

    title.value = '';
    description.value = '';
    postPetition.checked = true;

    submitBtn.click();
    await el.updateComplete;

    expect(el.listaPeticion).to.have.lengthOf(2);
    expect(el.message).to.equal('TITULO y DESCRIPCIÓN no debe estar vacío!');
  });
});
