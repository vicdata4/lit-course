import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/components/extras/vistas-api/api-pok';

const dataPok = [
    {
        name: "Charizard",
        sprites: { front_default: "img.png" },
        stats: [
            { base_stat: 1, stat: [ { name: "hp"} ] },
            { base_stat: 1, stat: [ { name: "attack" } ] },
            { base_stat: 1, stat: [ { name: "defense"} ] },
            { base_stat: 1, stat: [ { name: "special-attack"} ] },
            { base_stat: 1, stat: [ { name: "special-defense"} ] },
            { base_stat: 1, stat: [ { name: "speed"} ] },
        ],
        types: [
            { type: { name: "Fire" } },
            { type: { name: "Flying" } },
        ]
    },{
        name: "Charizard",
        sprites: { front_default: "img.png" },
        stats: [
            { base_stat: 1, stat: [ { name: "hp"} ] },
            { base_stat: 1, stat: [ { name: "attack" } ] },
            { base_stat: 1, stat: [ { name: "defense"} ] },
            { base_stat: 1, stat: [ { name: "special-attack"} ] },
            { base_stat: 1, stat: [ { name: "special-defense"} ] },
            { base_stat: 1, stat: [ { name: "speed"} ] },
        ],
        types: [
            { type: { name: "Fire" } },
        ]
    }
];

describe(' component', async() => {
    let el;

    before(async() => {
        el = await fixture(html`<api-pok .hits=${dataPok[1]}></api-pok>`);
        await el.updateComplete;
    });

    it('Componente renderizado', async() => {
        expect(el.shadowRoot).not.to.be.null;
    });


});