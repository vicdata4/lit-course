import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/components/extras/radio-options';

const data = [
    {value: "mtg", name: "Magic the Gathering", url: "https://api.magicthegathering.io/v1/cards?name="},
    {value: "lol", name: "League of Legends", url: "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/es_ES/champion/"},
    {value: "pok", name: "Pokemon", url: "https://pokeapi.co/api/v2/pokemon/"},
];

describe('Radio option component', async() => {
    let el;

    before(async() => {
        el = await fixture(html`<radio-options></radio-options>`);
        await el.updateComplete;
    });

    it('Componente renderizado', async() => {
        expect(el.shadowRoot).not.to.be.null;
    });

    it('Tamaño por defecto de datos', async() => {
        const radioOptionsDef = el.radioOptions;
        expect(radioOptionsDef.length).equal(0);
    });
});

describe('Radio option comp. con datos', async() => {
    let el;
    
    before(async() => {
        el = await fixture(html`<radio-options .radioOptions="${data}"></radio-options>`);
        await el.updateComplete;
    });

    it('Componente renderizado', async() => {
        expect(el.shadowRoot).not.to.be.null;
    });
    
    it('Tamaño de datos', async() => {
        const radioOptionsDef = el.radioOptions;
        expect(radioOptionsDef.length).equal(3);
    });
    
    it('Se dispatchea el evento de cambio de boton', async() => {
        const radioInput = el.shadowRoot.querySelector("#rad_opt_0");
        const radioEvent = new Event('change');
        const dispatchEventSpy = sinon.spy(el, 'dispatchEvent');

        radioInput.dispatchEvent(radioEvent);
        await el.updateComplete;

        expect(dispatchEventSpy.calledOnce).to.be.true;
        expect(dispatchEventSpy.getCall(0).args[0].type).to.equal('change');
        expect(dispatchEventSpy.getCall(0).args[0].detail).to.deep.equal({value: 'mtg'});
    });
});