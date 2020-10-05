import { LitElement, html, css } from 'lit-element';
import { mediaQueriesStyles } from '../utils/styles.js';
import { datos } from '../utils/datos-resumen-etapas.js';


class Item011 extends LitElement {
    
    static get properties() {
        return {
            total : { type : Number },
            staticData : { type : Array }
        };
    }
    
    constructor() {
        super();
        this.total = 0;
        this.staticData = datos;
    }

    static get styles() {
        return [
          mediaQueriesStyles,
          css`
            table{
                border: 1px solid #cecece;
                font-family: Arial, sans-serif;
                color: #7b7b7b;
            }
            caption{
                padding: 5%;
                background-color: #f6f6f6;
                border: 1px solid #cecece;
                border-bottom: none;
                font-weight: bold;
                font-size: 14px;
                color: black;
                
            }
            td{
                padding-left: 20px;
                padding-right: 20px;
            }
            tr:first-child{
                line-height: 40px;
            }
            .final {
                padding-bottom: 10px;
            }

            /***** Pruebas agregar etapa ******/
            input{
                margin: 1%;
                border:1px solid #cccccc;
            }
            button {
                background-color: black;
                color: white;
                font-size: 10px;
                font-weight: bold;
                border: solid black;
                border-radius: 5px;
                padding: 5px 20px;
                cursor: pointer;
            }
          `
        ];
      }    
    
    /** Pruebas Agrega nueva etapa */
    agrega(){
        const input = this.shadowRoot.querySelector('#add');
        const newData = {
            id: input.value,
            data: 1
        };
        
        this.staticData = [...this.staticData, ...[newData]];
    }

    /** Suma total */
    getTotal() {
        const arrayOfNumbers = this.staticData.map(function (obj) {
            return obj.data || 0;
        });
        
        return arrayOfNumbers.reduce(function(a, b) { return a + b; }, 0);
    }

    render() {
        return html`
        <table>
            <caption>Candidatos por etapa</caption>
            <tbody>
                <tr>
                    <td> Total</td>
                    <td id="total">${this.getTotal()}</td>
                </tr>
            
                ${this.staticData.map(datos => html`
                    <tr> 
                        <td>${datos.id}</td>
                        <td class="suma">${datos.data || 0}</td>
                    </tr>
                `)}
                <td class="final"></td>
            </tbody>
         </table>

        <!-- Pruebas Agregar nueva etapa -->
        <div><input id="add"><button @click="${this.agrega}">Añadir etapa</button></div>
        
        `;
    }
}
customElements.define('item-011', Item011);