import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/components/extras/img-comp';
import '../src/components/extras/vistas-api/api-mtg';

const dataMTG = {
    cards: [
        { name: "Tarmogoyf", setName: "MM2", type: "Creature", manacost: "{1}{G}", cmc: "2", text: "Texto", power: "*", toughness: "1+*", flavor: "Flavor text" },
        { name: "Tarmogoyf", setName: "MM2", type: "Creature", manacost: "{1}{G}", cmc: "2", text: "Texto", toughness: "1+*", flavor: "Flavor text" },
        { name: "Tarmogoyf", setName: "MM2", type: "Creature", manacost: "{1}{G}", cmc: "2", text: "Texto", power: "*", flavor: "Flavor text" },
        { name: "Tarmogoyf", setName: "MM2", type: "Creature", manacost: "{1}{G}", cmc: "2", text: "Texto", flavor: "Flavor text" },
    ]
};

describe('api-mtg component', async() => {
    let el;

    before(async() => {
        el = await fixture(html`<api-mtg .hits=${dataMTG}></api-mtg>`);
        await el.updateComplete;
    });

    it('Componente renderizado', async() => {
        expect(el.shadowRoot).not.to.be.null;
    });
});