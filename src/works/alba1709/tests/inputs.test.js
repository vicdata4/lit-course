import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../solicitudVacaciones/inputs-requests';

describe('Form functions', () => {
  let el, dateStart, dateEnd, submit;

  before(async () => {
    const component = html`<inputs-requests></inputs-requests>`;
    el = await fixture(component);
    await el.updateComplete;

    dateStart = el.shadowRoot.querySelector('#fechaIni');
    dateEnd = el.shadowRoot.querySelector('#fechaFin');
    submit = el.shadowRoot.querySelector('#btnAgregar');
  });

  it('Form is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Dispatch "my-event" event', async () => {
    dateStart.value = '2020-11-03';
    dateEnd.value = '2020-10-20';
    const eventSpy = sinon.spy(el, 'dispatchEvent');

    submit = el.shadowRoot.querySelectorAll('#btnAgregar')[0];
    submit.click();
    expect(eventSpy).calledOnce;
    expect(eventSpy.args[0][0].type).to.equal('my-event');
    expect(dateStart.value).to.equal('');
    expect(dateEnd.value).to.equal('');
  });
});
