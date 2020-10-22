import {LitElement, html, css} from 'lit-element';
import './formPetition';
import { tablePeticion, modalPopup } from '../utils/costum-css';

export class ListPetition extends LitElement {

    static get styles() {
        return [
          tablePeticion, modalPopup
        ];
      }

    static get properties() {
        return {
          listaPeticiones : {type: Array},
          popupOpen : {type: Boolean}
        };
      }
      
    constructor() { 
        super();
        this.listaPeticiones = JSON.parse(window.localStorage.getItem('list-peticion')),
        this.popupOpen = false;
    }

    showPetition(id){

        let popupPetTitulo = this.shadowRoot.querySelector('#peticionTitulo');
        this.listaPeticiones.map((peticion) => {
            if(peticion.id === id){
                popupPetTitulo = peticion.titulo;
                
                this.popupOpen = true;
            }
        });
    }

    closePopupPetition(){
        this.popupOpen = false;
    }

    render() {

        if(this.listaPeticiones !== null){
            return html`
            <section class="listaPeticiones">
                <div class="container-table">
                    <div class="table-title">
                        <h2>LISTA PETICIÓN</h2>
                    </div>
                    <table class="table-fill">
                    <thead>
                        <tr>
                            <th class="text-left">TITULO</th>
                                <th class="text-left">FECHA</th>
                        </tr>
                    </thead>
                    <tbody class="table-hover">  
                        ${this.listaPeticiones.map((peticion) => {
                            if(peticion.publicar === true){
                                return html`
                                    <tr>
                                    <td class="text-left"><a @click="${() => this.showPetition(peticion.id)}">${peticion.titulo}</a></td>
                                    <td class="text-left">${peticion.fecha}</td>
                                    </tr>
                                `
                            }
                        })}   
                    </tbody>
                </table>
                </div>
            </section>
            
            <div id="myModal" class="modal ${(this.popupOpen) ? 'active' : ''}">

                        <!-- Modal content -->
                        <div class="modal-content">
                        <span class="close" @click="${() => this.closePopupPetition()}">&times;</span>
                        <h1 id="popupPetitionTitle"></h1>
                        </div>

            </div>   
            `;
        }
    }
}

window.customElements.define('list-petition', ListPetition);