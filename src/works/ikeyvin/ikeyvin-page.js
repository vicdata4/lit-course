import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './components/elementTrello007.js';
import './components/elementTrello008.js';

class IkeyvinPage extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

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

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>iKeyvin</work-header>
        <h1>007 y 008</h1>
          <element-007></element-007>
          <hr>
          <element-008 listaPeticion=${this.listaPeticion}></element-008>
      </section>
    `;
  }
}

window.customElements.define('ikeyvin-page', IkeyvinPage);
