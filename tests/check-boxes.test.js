import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/components/check-boxes';

describe('CheckBoxes', () => {
    let el;
    const opciones = [
        { nombre: 'Opción 1' },
        { nombre: 'Opción 2' },
        { nombre: 'Opción 3' },
    ];

    before(async() => {
        el = await fixture(html`<check-boxes .boxOptions="${opciones}"></check-boxes>`);
        await el.updateComplete;
    });

    it('Renderizado correcto', async() => {
        expect(el.shadowRoot).not.to.be.null;
    });

    it('Crea un customEvent cuando una checkbox se marca', async() => {
        let detallesEvento;
        
        el.addEventListener('box-event', (ev) => {
            detallesEvento = ev.detail;
        });

        const checkboxes = el.shadowRoot.querySelectorAll('input[type="checkbox"]');
        const checkbox1 = checkboxes[0];

        expect(checkbox1.checked).to.be.false;

        checkbox1.checked = true;
        checkbox1.dispatchEvent(new Event('change'));

        expect(checkbox1.checked).to.be.true;

        expect(detallesEvento).to.exist;
        expect(detallesEvento.nombre).to.equal(opciones[0].nombre);
    });
})