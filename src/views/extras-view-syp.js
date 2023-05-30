import { LitElement, html, css } from 'lit-element';
import { styles } from '../utils/home-styles';
import { commonStyles } from '../utils/custom-styles';
import { navigatorStyles } from '../utils/custom-styles';
import { navigationStyles } from '../components/navigation/styles';
import '../components/extras/input-text';
import '../components/extras/radio-options';
import '../components/extras/img-comp';
import '../components/extras/vistas-api/api-omd';
import '../components/pag-nav';

class ExtrasViewSyP extends LitElement {

    static get styles() {
        return [styles, commonStyles, navigatorStyles, navigationStyles, css`
            #spOp {
                font-style: italic;
                margin-right: 5px;
            }

            #yearCont{
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }

            .inputPeli {
                padding-top: 20px;
            }

            .cont-paginas {
                display: flex;
                justify-content: center
            }
        `];
    }

    static get properties() {
        return {
            hits: { type: Array },
            optionsList: { type: Array },
            searchCategory: { type: String },
            searchYear: { type: Number },
            searchTitle: { type: String },
            searchPage: { type: Number },
        }
    }

    constructor(){
        super();
        this.hits = [];
        this.optionsList = [
            {name: "Cualquiera", value: "all"},
            {name: "Películas", value: "movie"},
            {name: "Series", value: "series"},
            {name: "Juegos", value: "game"},
        ];
        this.searchTitle = "";
        this.searchYear = 0;
        this.searchCategory = "all";
        this.searchPage = 1;
    }

    async consulta(ev){
        let urlBusqueda = "https://www.omdbapi.com/?apikey=e58057c7&s=";
        
        const busqueda = ev.detail.mensaje ? ev.detail.mensaje : "";
        const year = this.shadowRoot.querySelector("#inputYear").value;
        const url = ev.detail.url ? ev.detail.url : "";

        if (busqueda) { this.searchTitle = busqueda }
        if (year)     { this.searchYear = year }
        if (url)      { this.searchPage = url }
        
        if(busqueda || url){
            urlBusqueda += this.searchTitle;
            urlBusqueda += this.searchYear ? "&y=" + this.searchYear : '';
            urlBusqueda += this.searchCategory != "all" ? "&type=" + this.searchCategory : '';
            urlBusqueda += "&page=" + this.searchPage;

            fetch(urlBusqueda)
            .then(response => response.json())
            .then(data => {
                this.hits = data;

                const inputTextComponent = this.shadowRoot.querySelector("input-text");
                const inputTextElement = inputTextComponent.shadowRoot.querySelector("#inputTexto");
                
                inputTextElement.value = this.searchTitle;
            })
            .catch(error => console.error(error));
            
        }else{
            alert("Faltan datos");
        }
    }

    changeSearchCat(ev){
        this.searchCategory = ev.detail.value;
    }

    calcPags(){
        if (!this.hits) return 1;

        const totResults = this.hits.totalResults;
        const numPags = Math.floor(totResults / 10);

        return totResults % 10 !== 0 ? numPags + 1 : numPags;
    }

    render(){
        return html`
            <common-header></common-header>
            <navigation-wc></navigation-wc>
            <sub-navigation></sub-navigation>

            <div class="container" style="display: flex; justify-content: space-around; align-items: center">
                <div class="inputPeli">
                    Introduce un título de película
                    <input-text @evBusq="${this.consulta}"></input-text>
                </div>
                <div id="yearCont">
                    <small id="spOp">(Opcional)</small>Introduce un año
                    <input type="number" id="inputYear">
                </div>
                <div style="margin: 20px 0">
                    Introduce una categoría
                    <radio-options id="inputRadio" @change="${this.changeSearchCat}" .radioOptions="${this.optionsList}" style="display: flex"></radio-options>
                </div>
            </div>

            <div class="cont-paginas">
                <pag-nav .nPags="${this.calcPags()}" @href-event="${this.consulta}"></pag-nav>
            </div>

            <img-comp style="margin: 10px 50px" category="mov" .resultados="${this.hits}"></img-comp>
        `;
    }
}

customElements.define('extras-view-syp', ExtrasViewSyP);