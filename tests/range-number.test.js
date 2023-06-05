import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/components/range-number';

describe('Input radio', () => {
    let el;

    before(async() => {
        el = await fixture(html`<range-number></range-number>`);
        await el.updateComplete;
    });

    it('Elemento renderizado', async() => {
        expect(el.shadowRoot).not.to.be.null;
    });

    it('Input texto muestra número', async() => {
        const valorRango = el.shadowRoot.querySelector("#rango");
        const valorText = el.shadowRoot.querySelector("#valor");
        
        expect(valorRango.value).equal(valorText.value);
    });

    it('Bounds limits', async() => {
        const rango = el.shadowRoot.querySelector("#rango");
        
        rango.value = rango.min;
        expect(rango.value).equal("0");

        rango.value = rango.max;
        expect(rango.value).equal("100");
    });

    it('Actualiza el valor', async() => {
        const rangoInput = el.shadowRoot.querySelector("#rango");
        const valorInput = el.shadowRoot.querySelector("#valor");
        const cambiaValorSpy = sinon.spy(el, 'cambiaValor');
        
        rangoInput.value = 75;
        rangoInput.dispatchEvent(new Event('input'));
        
        await el.updateComplete;

        expect(el.num).to.equal(75);
        expect(valorInput.value).to.equal('75');
        expect(cambiaValorSpy.calledOnce);

        cambiaValorSpy.restore();
    });

});
