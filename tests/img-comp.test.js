import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/components/extras/img-comp';
import '../src/components/extras/vistas-api/api-mtg';
import '../src/components/extras/vistas-api/api-pok';
import '../src/components/extras/vistas-api/api-omd';
import '../src/components/modal-window';

const dataMTG = {
    cards: [
        { name: "Tarmogoyf", setName: "MM2", type: "Creature", manacost: "{1}{G}", cmc: "2", text: "Texto", power: "*", toughness: "1+*", flavor: "Flavor text" },
        { name: "Tarmogoyf", setName: "MM2", type: "Creature", manacost: "{1}{G}", cmc: "2", text: "Texto", toughness: "1+*", flavor: "Flavor text" },
        { name: "Tarmogoyf", setName: "MM2", type: "Creature", manacost: "{1}{G}", cmc: "2", text: "Texto", power: "*", flavor: "Flavor text" },
        { name: "Tarmogoyf", setName: "MM2", type: "Creature", manacost: "{1}{G}", cmc: "2", text: "Texto", flavor: "Flavor text" },
    ]
};

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

const dataMov = {
    Search: [
        {
            "Title": "Threat Matrix",
            "Year": "2003-2004",
            "imdbID": "tt0364888",
            "Type": "games",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTdlYjcwMmEtMjUxMi00NDg4LTg0YjUtZjAxZGVhYWVjMTFjXkEyXkFqcGdeQXVyMjcyMDU4NA@@._V1_SX300.jpg"
        },
        {
            "Title": "A Glitch in the Matrix",
            "Year": "2021",
            "imdbID": "tt13711870",
            "Type": "series",
            "Poster": "N/A"
        },
        {
            "Title": "Batman v Superman: Dawn of Justice (Ultimate Edition)",
            "Year": "2016",
            "imdbID": "tt18689424",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BOTRlNWQwM2ItNjkyZC00MGI3LThkYjktZmE5N2FlMzcyNTIyXkEyXkFqcGdeQXVyMTEyNzgwMDUw._V1_SX300.jpg"
        },
    ],
    Response : "True"
}

let el;

describe('Comp vacío', async() => {

    before(async() => {
        el = await fixture(html`<img-comp .resultados=""></img-comp>`);
        await el.updateComplete;
    });

    it('Componente renderizado', async() => {
      expect(el.shadowRoot).not.to.be.null;
    });
  

    it('', async() => {
        
        el.resultados = "";

        expect();
    });
    
});

describe('Comp de mtg', async() => {
    before(async() => {
        el = await fixture(html`<img-comp .resultados=${dataMTG} category="mtg"></img-comp>`);
        await el.updateComplete;
    });
    
    it('Componente renderizado', async() => {
        expect(el).not.to.be.null;
    });

    it('Estilo de tipo card', async() => {
        el.cardStyle = true;

        expect();
    });
    
});

describe('Comp de pokemon', async() => {
    before(async() => {
        el = await fixture(html`<img-comp .resultados="${dataPok[0]}" category="pok"></img-comp>`);
        await el.updateComplete;
    });
    
    it('Componente renderizado', async() => {
        expect(el.shadowRoot).not.to.be.null;
    });

    it('Estilo de tipo card', async() => {
        el.cardStyle = true;
        el.resultados = dataPok[1];
        
        expect();
    });
    
});

describe('Comp de movies', async() => {
    before(async() => {
        el = await fixture(html`<img-comp .resultados=${dataMov}></img-comp>`);
        el.category = "mov";
        await el.updateComplete;
    });
    
    it('Componente renderizado', async() => {
        expect(el.shadowRoot).not.to.be.null;
    });
    
    it('Sin respuesta', async() => {
        el.resultados = { Response: "false" };

        expect(el.shadowRoot.querySelector(".card-container-mov")).to.be.null;
    });


});