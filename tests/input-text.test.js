import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/components/extras/input-text';

describe('', async() => {
    let el;

    before(async() => {
        el = await fixture(html`<input-text></input-text>`);
        await el.updateComplete;
    });

    it('Componente renderizado', async() => {
        expect(el.shadowRoot).not.to.be.null;
    });

    it('', async() => {
        const cartaBuscada = el.shadowRoot.querySelector('#inputTexto');
        cartaBuscada.value = 'Nombre de carta';

        const dispatchEventSpy = sinon.spy(el, 'dispatchEvent');
        
        const event = new Event('submit');
        el.shadowRoot.querySelector('form').dispatchEvent(event);
        
        // console.log(dispatchEventSpy);

        expect(dispatchEventSpy.calledOnce).to.be.true;
        expect(dispatchEventSpy.getCall(0).args[0].type).to.equal('evBusq');
        expect(dispatchEventSpy.getCall(0).args[0].detail).to.deep.equal({mensaje: "Nombre de carta"});
        // expect(event.defaultPrevented).to.be.true;
        // assert.isTrue(event.defaultPrevented);
    });
});