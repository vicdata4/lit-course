import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/components/input-component.js';

describe('Form validation', () => {
  let el;

  before(async() => {
    const component = html`
      <input-component></input-component>
    `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Form is rendered correctly', async() => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Fill input field', async() => {
    const eventSpy = sinon.spy(el, 'dispatchEvent');
    const inputText = el.shadowRoot.querySelector('#message');
    const inputSubmit = el.shadowRoot.querySelector('.btn-submit');
    inputText.value = 'Input test';
    inputSubmit.click();
    

    expect(eventSpy).calledOnce;
    expect(eventSpy.args[0][0].type).to.equal('my-event');
  });
});
