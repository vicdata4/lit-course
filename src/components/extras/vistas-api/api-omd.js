import { LitElement, html, css } from 'lit-element';
import '../../../components/modal-window';
class ApiOmd extends LitElement {

    static get styles() {
        return css`
            .card-container-mov {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
            }

            .card-mov {
                border: 1px solid rgba(0, 0, 0, 0.155);
                border-radius: 0.25rem;
                background-color: #fff;
                box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
                margin: 10px;
                padding: 1rem;
                width: 150px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                border-radius: 10px;
                transition: transform 0.5s;
                position: relative;
            }

            .card-header-mov {
                text-align: center;
                min-height: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #9bcce7bd;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                transition: background-color 0.5s;
            }
              
            .card-body-mov {
                overflow: hidden;
            }
              
            .card-footer-mov {
                margin-top: 0.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #9bcce7bd;
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
            }

            .contenedor-img-mov {
                text-align: center;
            }

            .overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                opacity: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                text-align: center;
                transition: opacity 0.3s;
                overflow: hidden;
                cursor: pointer;
            }
            
            .overlay-text {
                color: #fff;
                font-weight: bold;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .image-container:hover .overlay {
                opacity: 1;
            }

            .image-container {
                position: relative;
                width: 150px;
                height: 225px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
              
            .image {
                max-width: 150px;
                min-width: 150px;
                height: auto;
                object-fit: contain;
            }

            .noRes {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 225px;
                width: 150px;
                text-align: center;
                color: #555;
            }
              
            span {
                margin: 10px 0;
            }
            
            .card-mov:hover .card-header-mov {
                background-color: #363da8;
            }

            .spanType {
                text-align: left;
                margin-left: 15px
            }
        
            #div02 {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        
            #div02 p:last-child {
                margin-top: auto;
            }

            #imgModal {
                border-bottom-left-radius: 15px;
            }
            
            // ---- CARD DESPLEGABLE ---- {
            // .card-mov:hover .card-body-mov {
            //     display: block;
            //     opacity: 1;
            //     visibility: visible;
            //     max-height: 240px;
            //     transition-delay: 0s;
            // }
            
            // .card-mov:hover .card-container-mov{
            //     position: relative;
            //     z-index: 3;
            // }

            // .card-body-mov {
            //     opacity: 0;
            //     visibility: hidden;
            //     max-height: 0;
            //     transition: max-height 0.5s, opacity 0.5s;
            //     transition: max-height 0.5s, opacity 0.5s, visibility 0s 0.5s;
            // }

            // ---- CARD DESPLEGABLE ---- }
        `;
    }

    static get properties(){
        return {
            hits: { type: Array },
            hitData: { type: Object }
        }
    }

    constructor(){
        super();
        this.hits = [];
        this.hitData = {};
    }

    capitalizeFirstLetter(word) {
        return word ? word.charAt(0).toUpperCase() + word.slice(1) : '';
    }

    showHitData(hit){
        this.hitData = hit;
        const modal = this.shadowRoot.querySelector("modal-window");
        modal.openModal();
    }

    render(){
        if(this.hits.Response == 'True'){
            return html`
                <modal-window>
                    <h2>${this.hitData.Title}</h2>
                    <div id="div01" style="display: flex; justify-content: space-evenly">
                        <img id="imgModal" src="${this.hitData.Poster}" style="width: 200px">
                        <div id="div02">
                            <span class="spanType"><strong>Tipo: </strong>${this.capitalizeFirstLetter(this.hitData.Type)}</span>
                            <span class="spanType"><strong>Año: </strong>${this.hitData.Year}</span>
                            <p style="text-align: left; margin-left: 15px">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <p>
                                Más información:<br>
                                <a href="https://www.google.es/search?q=${this.hitData.Title}" target="_blank">Info en Google</a>
                            </p>
                        </div>
                    </div>
                </modal-window>

                <div class="card-container-mov">
                    ${this.hits.Search.map((item) => html`
                        <div class="card-mov">
                            <div class="card-header-mov">
                                <strong>${item.Title}</strong>
                            </div>
                            <div class="card-body-mov">
                                <div style="margin: 5px 0">
                                    <span id="spanType" style="font-style: italic">${this.capitalizeFirstLetter(item.Type)}</span>
                                </div>
                                <div class="contenedor-img-mov">
                                    ${item.Poster && item.Poster != "N/A" ? html`
                                        <div class="image-container">
                                            <img src="${item.Poster}" class="image">
                                            <div class="overlay" @click="${()=>this.showHitData(item)}">
                                                <span class="overlay-text">Más información</span>
                                            </div>
                                        </div>
                                    ` : html`
                                        <div class="noRes image-container">
                                            <img src="/assets/images/notfound.png">
                                            <p>Sin imagen</p>
                                            <div id="divOverlay" class="overlay" @click="${()=>this.showHitData(item)}">
                                                <span class="overlay-text">Más información</span>
                                            </div>
                                        </div>
                                    `}
                                </div>
                            </div>
                            <div class="card-footer-mov">
                                <span>Año: ${item.Year}</span>
                            </div>
                        </div>
                    `)}
                </div>
            `;
        }else{
            return html`
                <div>
                    <p>Sin resultados</p>
                </div>
            `;
        }
    }
}

customElements.define('api-omd', ApiOmd);