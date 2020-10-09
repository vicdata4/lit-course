import {LitElement, html} from 'lit-element';
import './elementTrello007.js';
import './elementTrello008.js';

class MainApp extends LitElement {

    static get properties(){
        return{
            listaPeticion: {type: Array}
        }
    }

    constructor() {
        super();
        let list = JSON.parse(localStorage.getItem('list-peticion'));
        this.listaPeticion = list === null ? [] : list;
    }


    render(){
        return html`
            <h1>007 y 008</h1>
            <element-007></element-007>
            <hr>
            <element-008 listaPeticion=${this.listaPeticion}></element-008>
        `;
    }

}

window.customElements.define('main-app', MainApp);