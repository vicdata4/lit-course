import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './components/form-petition.js';
import './components/list-petition.js';
import './components/monitoring-list-petition.js';

const components = {
  formPetition: () => html`<test-list-petition></test-list-petition></br><form-petition></form-petition>`,
  listPetition: () =>
    html`<h1>Lista de peticiones</h1>
      <list-petition></list-petition>`,
};

class IkeyvinPage extends LitElement {
  static get styles() {
    return [commonStyles];
  }

  static get properties() {
    return {
      current: { type: String, attribute: false },
      listaPeticiones: { type: Array },
    };
  }

  constructor() {
    super();
    this.current = 'formPetition';
  }

  setComponent(component) {
    this.current = component;
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>iKeyvin</work-header>
        <div class="common-list">
          ${Object.keys(components).map(
            (item) => html` <button class="common-btn" @click="${() => this.setComponent(item)}">${item}</button> `,
          )}
        </div>
        ${components[this.current]()}
      </section>
    `;
  }
}

window.customElements.define('ikeyvin-page', IkeyvinPage);
