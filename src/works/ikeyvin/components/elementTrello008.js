import {LitElement, html} from 'lit-element';
import '../components/elementTrello007';

export class ElementTrello008 extends LitElement {

    static get properties() {
        return {
          listaPeticiones : {type: Array}
        };
      }
      
    constructor() { 
        super();
        this.listaPeticiones = []
    }


    verListaPeticiones(){
        this.listaPeticiones = JSON.parse(window.localStorage.getItem('list-peticion'));
        console.log(this.listaPeticiones);
        if(this.listaPeticiones !== null){
            return html`
                    <div>
                      ${this.listaPeticiones.map((peticion) => {
                          return html`<li>${peticion.titulo} - ${peticion.fecha}</li>`
                      })}
                    </div>
                `;
        }
    }

    render() {
        return html`
        <section class="listaPeticiones">
            <h2>Lista de peticiones</h2>
            <br>
            ${this.verListaPeticiones()}
        </section>   
        `;
    }
}

window.customElements.define('element-008', ElementTrello008);