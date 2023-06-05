import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/components/extras/stat-bar';

describe('', async() => {
    let el;
    
    before(async() => {
        el = await fixture(html`<stat-bar></stat-bar>`);
        await el.updateComplete;
    });

    it('Componente renderizado', async() => {
        expect(el.shadowRoot).not.to.be.null;
    });

    it('Tamaño de las barras por defecto', async() => {
        const widthBar = el.shadowRoot.querySelector("#widthBar");
        const filled = el.shadowRoot.querySelector("#filled");
        const heightBar = el.shadowRoot.querySelector("#filled");

        expect(widthBar.style.width).to.equal("250px");
        expect(widthBar.style.height).to.equal("15px");
        expect(filled.style.width).to.equal("5px");
        expect(filled.style.height).to.equal("15px");

        expect(widthBar.style.width).to.equal(el.widthBar + "px");
        expect(widthBar.style.height).to.equal(el.heightBar + "px");
        expect(filled.style.width).to.equal(el.filled + "px");
        expect(filled.style.height).to.equal(el.heightBar + "px");
    });

    it('Color llega correspondiente', async() => {
        el = await fixture(html`<stat-bar filled="75"></stat-bar>`);
        await el.updateComplete;

        el.filled = "125";
        el.filled = "175";
        el.filled = "225";
        el.filled = "275";
    });
});
