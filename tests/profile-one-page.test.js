import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/profiles/profile-one/profile-one-page';

describe('', () => {
    let el;

    before(async() => {
        el = await fixture(html`<profile-one-page></profile-one-page>`);
        await el.updateComplete;
    });

    it('Empty list is rendered correctly', async() => {
        expect(el.shadowRoot).not.to.be.null;
    });

    it('Dispatchea my-event y muestra alert', async () => {
        const boton = el.shadowRoot.querySelector('button');
        boton.click();
      
        const inputForm = el.shadowRoot.querySelector('input-form');
        const alertSpy = sinon.spy(window, 'alert');
        inputForm.dispatchEvent(new CustomEvent('my-event', { detail: { message: 'test message' } }));
      
        expect(alertSpy.calledOnce).to.be.true;
        expect(alertSpy.getCall(0).args[0]).to.equal('Dispatched custom event called "my-event" with the following message: test message');
    
        alertSpy.restore();
    });

    it('should show alert when delete-event is dispatched', async() => {
        const botones = el.shadowRoot.querySelectorAll(".common-btn");
        botones[1].click();
        await el.updateComplete;

        const listComponent = el.shadowRoot.querySelector('list-component');
        
        const eventDetail = { index: 0 };
        const event = new CustomEvent('delete-event', { detail: eventDetail });
        const alertSpy = sinon.spy(window, 'alert');

        listComponent.dispatchEvent(event);

        expect(alertSpy.args[0][0]).to.equal(`Dispatched custom event called "delete-event" with the following index: ${eventDetail.index}`);
    
        alertSpy.restore();
    });
});