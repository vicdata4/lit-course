import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/components/extras/vistas-api/api-omd';

const dataMov = {
    Search: [
        {
            "Title": "Threat Matrix",
            "Year": "2003-2004",
            "imdbID": "tt0364888",
            "Type": "games",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTdlYjcwMmEtMjUxMi00NDg4LTg0YjUtZjAxZGVhYWVjMTFjXkEyXkFqcGdeQXVyMjcyMDU4NA@@._V1_SX300.jpg"
        }
    ],
    Response : "True"
}

const dataMov2 = {
    Search: [
        {
            "Title": "A Glitch in the Matrix",
            "Year": "2021",
            "imdbID": "tt13711870",
            "Type": "series",
            "Poster": "N/A"
        }
    ],
    Response : "True"
}

describe(' component', async() => {
    let el;

    before(async() => {
        el = await fixture(html`<api-omd .hits=${dataMov}></api-omd>`);
        await el.updateComplete;
    });

    it('Componente renderizado', async() => {
        expect(el.shadowRoot).not.to.be.null;
    });

    it('Se llama a showHitData y muestra el modal', async() => {
        const showHitDataSpy = sinon.spy(el, 'showHitData');
        const divOverlay = el.shadowRoot.querySelector(".overlay");
        const modal = el.shadowRoot.querySelector("modal-window").shadowRoot.querySelector(".modal");
        
        expect(modal.classList.contains('open')).to.be.false;

        divOverlay.click();
        await el.updateComplete;

        expect(showHitDataSpy.calledOnce).to.be.true;
        expect(modal.classList.contains('open')).to.be.true;
        showHitDataSpy.restore();
    });

    it('Llama a showHitData al hacer clic sin foto', async() => {
        el.hits = dataMov2;
        await el.updateComplete;

        const showHitDataSpy = sinon.spy(el, 'showHitData');
        const overlay = el.shadowRoot.querySelector(".overlay");

        overlay.click();
        await el.updateComplete;

        expect(showHitDataSpy.calledOnce).to.be.true;
        
        showHitDataSpy.restore();
    });
      
});