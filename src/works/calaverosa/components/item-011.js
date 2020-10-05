import { LitElement, html, css } from 'lit-element';
import { datos } from '../utils/datos.js';


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
          css`
            table{
                margin-top: 2%;
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
        
        this.total += newData.data;
        
        /* console.log(this.staticData);
        console.log(typeof(newData.data)); */
    }

    /** Suma total */
    firstUpdated(){
        
        const suma = this.shadowRoot.querySelectorAll('td.suma');
        let sumaTotal = suma;

        for (let i = 0; i < sumaTotal.length; i++) {
                if( sumaTotal[i].innerText == ""){
                    sumaTotal[i].innerText = 0;
                }
                
                this.total += parseInt(sumaTotal[i].innerText);
        }
    }

    render() {
        return html`
        <table>
            <caption>Candidatos por etapa</caption>
            <tbody>
                <tr>
                    <td> Total</td>
                    <td id="total">${this.total}</td>
                </tr>
            
                ${this.staticData.map( datos => html`
                    <tr> 
                        <td>${datos.id}</td>
                        <td class="suma">${datos.data}</td>
                    </tr>
                `)}
                <td class="final"></td>
            </tbody>
         </table>

        <!-- Pruebas Agregar nueva etapa -->
         <input id="add"><button @click="${this.agrega}">Añadir etapa</button>
        `;
    }
}
customElements.define('item-011', Item011);