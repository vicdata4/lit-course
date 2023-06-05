import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/components/input-form.js';

describe('Form validation', () => {
  let el;

  before(async() => {

    const component = html`
      <input-form></input-form>
    `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Form is rendered correctly', async() => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Error por texto sin marca', async() => {
    const el = await fixture(html`<input-form .fullContent=${true}></input-form>`);

    const eventSpy = sinon.spy(el, 'dispatchEvent');
    const alertStub = sinon.stub(window, 'alert');

    const inputText = el.shadowRoot.querySelector("#message");
    inputText.value = 'Prueba sin marca';

    const inputMarca = el.shadowRoot.querySelector("#marca");
    inputMarca.value = '';

    const inputSubmit = el.shadowRoot.querySelector(".btn-submit");
    inputSubmit.click();

    expect(eventSpy).not.called;
    expect(alertStub).calledOnce;

    alertStub.restore();
  });

  it('Fill input field y marca', async() => {
    const el = await fixture(html`<input-form .fullContent=${true}></input-form>`);

    const eventSpy = sinon.spy(el, 'dispatchEvent');

    const inputText = el.shadowRoot.querySelector('#message');
    inputText.value = 'Input test';

    const inputMarca = el.shadowRoot.querySelector('#marca');
    inputMarca.value = 'saab';
    
    const inputSubmit = el.shadowRoot.querySelector('.btn-submit');
    inputSubmit.click();

    expect(eventSpy).calledOnce;
    expect(eventSpy.args[0][0].type).to.equal('my-event');
  });

  it('Fill input field with marca and color', async() => {
    const el = await fixture(html`
      <input-form .fullContent=${true}></input-form>
    `);

    const eventSpy = sinon.spy(el, 'dispatchEvent');

    const inputText = el.shadowRoot.querySelector("#message");
    inputText.value = 'Input test';

    const inputMarca = el.shadowRoot.querySelector("#marca");
    inputMarca.value = 'volvo';

    const inputColor = el.shadowRoot.querySelector("#color");
    inputColor.value = '#ffffff';

    const expectedDate = new Date();
    const inputDate = new Date(expectedDate.getTime());
    inputDate.setMilliseconds(0);
    
    const inputSubmit = el.shadowRoot.querySelector('.btn-submit');
    inputSubmit.click();

    expect(eventSpy.calledOnce);
    expect(eventSpy.args[0][0].type).to.equal('my-event');
    expect(eventSpy.args[0][0].detail).to.deep.equal({
      message: 'Input test',
      date: inputDate,
      marca: 'volvo',
      color: '#ffffff'
    });
  });

  it('Renderiza inputs de color y select cuando fullContent es true', async () => {
    
    const el = await fixture(html`
      <input-form .fullContent=${true}></input-form>
    `);

    const colorInput = el.shadowRoot.querySelector("#color");
    const marcaInput = el.shadowRoot.querySelector("#marca");

    expect(el.fullContent).to.be.true;
    expect(colorInput).to.exist;
    expect(marcaInput).to.exist;
  });

  it('No renderiza inputs de color y select cuando fullContent es false', async () => {
    
    const el = await fixture(html`
      <input-form .fullContent=${false}></input-form>
    `);

    const colorInput = el.shadowRoot.querySelector("#color");
    const marcaInput = el.shadowRoot.querySelector("#marca");

    expect(el.fullContent).to.be.false;
    expect(colorInput).to.be.null;
    expect(marcaInput).to.be.null;
  });
});
