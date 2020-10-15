import {LitElement, html, css} from 'lit-element';
import '../components/elementTrello007';
import { tablePeticion } from '../utils/costum-css';

export class ElementTrello008 extends LitElement {

    static get styles() {
        return [
          tablePeticion
        ];
      }

    static get properties() {
        return {
          listaPeticiones : {type: Array}
        };
      }
      
    constructor() { 
        super();
        this.listaPeticiones = []
    }

    showPetition(id){
        this.listaPeticiones = JSON.parse(window.localStorage.getItem('list-peticion'));
        this.listaPeticiones.map((peticion) => {
            if(peticion.id === id){
                alert("Titulo: " + peticion.titulo + "Descripcion: " + peticion.descripcion + " Fecha: " + peticion.fecha);
            }
        });
        
    }

    verListaPeticiones(){
        this.listaPeticiones = JSON.parse(window.localStorage.getItem('list-peticion'));
        console.log(this.listaPeticiones);
        if(this.listaPeticiones !== null){
            return html`
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
            `;
        }
    }

    render() {
        return html`
        <section class="listaPeticiones">
            <div class="container-table">
                <div class="table-title">
                    <h2>LISTA PETICIÓN</h2>
                </div>
                ${this.verListaPeticiones()}
            </div>
        </section>   
        `;
    }
}

window.customElements.define('element-008', ElementTrello008);