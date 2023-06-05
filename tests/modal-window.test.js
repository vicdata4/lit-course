import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/components/modal-window';

describe('modal-window component', async() => {
    let el;

    before(async() => {
        el = await fixture(html`<modal-window></modal-window>`);
        await el.updateComplete;
    });

    it('Componente renderizado', async() => {
        expect(el.shadowRoot).not.to.be.null;
    });

    it('Modal se abre y cierra correctamente', async() => {
        const modal = el.shadowRoot.querySelector('.modal');
        const aceptar = el.shadowRoot.querySelector("#botAcept");
        const cancelar = el.shadowRoot.querySelector("#botCancel");
        
        expect(modal.classList.contains('open')).to.be.false;

        el.openModal();
        expect(modal.classList.contains('open')).to.be.true;

        aceptar.click();
        expect(modal.classList.contains('open')).to.be.false;

        el.openModal();
        expect(modal.classList.contains('open')).to.be.true;

        cancelar.click();
        expect(modal.classList.contains('open')).to.be.false;
    });
});