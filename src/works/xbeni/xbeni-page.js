import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './components/visualizacion-pe/visualizacion-pe';
import './components/informe-cipa/informe-cipa';

const components = {
  VisualizacionPeticionesEmpleados: () => html`<visualizacion-pe></visualizacion-pe>`,
  InformeCandidatosInformacionDesactualizada: () => html`<informe-cipa></informe-cipa>`
};

class XbeniPage extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  static get properties() {
    return {
      current: { type: String, attribute: false }
    };
  }

  constructor() {
    super();
    this.current = 'VisualizacionPeticionesEmpleados';
  }

  setComponent(component) {
    this.current = component;
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>XBeni</work-header>
        <div class="common-list">
          ${Object.keys(components).map(item => html`
            <button class="common-btn" @click="${() => this.setComponent(item)}">${item}</button>
          `)}
        </div>
        ${components[this.current]()}
      </section>
    `;
  }
}

window.customElements.define('xbeni-page', XbeniPage);
