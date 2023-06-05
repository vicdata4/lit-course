import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/components/extras/switch-button';

describe('Switch button component', async() => {
    let el;

    before(async() => {
        el = await fixture(html`<switch-button></switch-button>`);
        await el.updateComplete;
    });

    it('Componente renderizado', async() => {
        expect(el.shadowRoot).not.to.be.null;
    });

    it('Cambia el estilo', async() => {
        const switchButton = el.shadowRoot.querySelector("#switchbutton");
        const dispatchEventSpy = sinon.spy(el, 'dispatchEvent');
        const switchEvent = new Event('change');

        switchButton.dispatchEvent(switchEvent);
        await el.updateComplete;

        expect(dispatchEventSpy.calledOnce).to.be.true;
        expect(dispatchEventSpy.getCall(0).args[0].type).to.equal('change');
        expect(dispatchEventSpy.getCall(0).args[0].detail).to.deep.equal({valor: false});
        
        dispatchEventSpy.restore();
    });
});