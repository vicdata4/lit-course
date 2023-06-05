import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/components/radio-text';
import '../src/components/check-boxes';

describe('Radio text styles', () => {
    let el;

    before(async() => {
        el = await fixture(html`<radio-text></radio-text>`);
        await el.updateComplete;
    });

    it('Renderizado correcto', async() => {
        expect(el.shadowRoot).not.to.be.null;
    });

    it('Propiedades por defecto', async() => {
        expect(el.color).equal("#000000");
        expect(el.optionsBox.length).equal(3);
        expect(el.selectedClass).equal("");
    });

    it('Texto cambia de color', async() => {
        const texto = el.shadowRoot.querySelector("#texto");
        const formulario = el.shadowRoot.querySelector("#formulario");
        const opciones = el.shadowRoot.querySelectorAll(".inputColor");
        const cambiaColorSpy = sinon.spy(el, 'cambiaColor');
        // const boton = el.shadowRoot.querySelector("#boton");
        
        expect(texto.style.color).to.equal('rgb(0, 0, 0)');
        
        opciones[1].checked = true;
        
        formulario.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        await el.updateComplete;

        expect(texto.style.color).to.equal('red');

        cambiaColorSpy.restore();
    });

    it('Texto cambia a negrita y se desmarca', async() => {
        const texto = el.shadowRoot.querySelector("#texto");
        const markedBoxSpy = sinon.spy(el, 'markedBox');
        const checkboxEvent = new CustomEvent('box-event', {
            detail: { nombre: 'Negrita' }
        });
        
        el.markedBox(checkboxEvent);
        await el.updateComplete;
        expect(markedBoxSpy.calledOnce).to.be.true;
        expect(texto.classList.contains('custom-bold')).to.be.true;
        
        el.markedBox(checkboxEvent);
        await el.updateComplete;
        expect(markedBoxSpy.callCount).to.equal(2);
        expect(texto.classList.contains('custom-bold')).to.be.false;

        markedBoxSpy.restore();
    });
    
    it('Texto cambia a cursiva y se desmarca', async() => {
        const texto = el.shadowRoot.querySelector("#texto");
        const markedBoxSpy = sinon.spy(el, 'markedBox');
        const checkboxEvent = new CustomEvent('box-event', {
            detail: { nombre: 'Cursiva' }
        });
        
        el.markedBox(checkboxEvent);
        await el.updateComplete;
        expect(markedBoxSpy.calledOnce).to.be.true;
        expect(texto.classList.contains('custom-italic')).to.be.true;
        
        el.markedBox(checkboxEvent);
        await el.updateComplete;
        expect(markedBoxSpy.callCount).to.equal(2);
        expect(texto.classList.contains('custom-italic')).to.be.false;

        markedBoxSpy.restore();
    });

    it('Texto cambia a subrayada y se desmarca', async() => {
        const texto = el.shadowRoot.querySelector("#texto");
        const markedBoxSpy = sinon.spy(el, 'markedBox');
        const checkboxEvent = new CustomEvent('box-event', {
            detail: { nombre: 'Subrayada' }
        });
        
        el.markedBox(checkboxEvent);
        await el.updateComplete;
        expect(markedBoxSpy.calledOnce).to.be.true;
        expect(texto.classList.contains('custom-underline')).to.be.true;
        
        el.markedBox(checkboxEvent);
        await el.updateComplete;
        expect(markedBoxSpy.callCount).to.equal(2);
        expect(texto.classList.contains('custom-underline')).to.be.false;

        markedBoxSpy.restore();
    });
});