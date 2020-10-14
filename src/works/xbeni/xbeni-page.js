import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './components/visualizacion-pe/visualizacion-pe';
import './components/informe-cipa/informe-cipa';

class XbeniPage extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>XBeni</work-header>
        <visualizacion-pe></visualizacion-pe>
        <informe-cipa></informe-cipa>
      </section>
    `;
  }
}

window.customElements.define('xbeni-page', XbeniPage);
