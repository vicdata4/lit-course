import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './components/formPetition.js';
import './components/listPetition.js';

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
}

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>iKeyvin</work-header>
          <br>
          <form-petition></form-petition>
          <hr>
          <list-petition></list-petition>
      </section>
    `;
  }
}

window.customElements.define('ikeyvin-page', IkeyvinPage);
