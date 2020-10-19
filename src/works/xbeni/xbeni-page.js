import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './components/item002_lista-cipa/item002_lista-cipa';
import './components/reporte-pe/reporte-pe';

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
        <item002_lista-cipa></item002_lista-cipa>
        <div>
          <reporte-pe></reporte-pe>
        </div>
      </section>
    `;
  }
}

window.customElements.define('xbeni-page', XbeniPage);
