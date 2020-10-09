import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './components/visualizacion-peticiones-empleados/visualizacion-peticiones-empleados';
import './components/informe-candidatos-informacion-desactualizada/informe-candidatos-informacion-desactualizada';

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
        <visualizacion-peticiones-empleados></visualizacion-peticiones-empleados>
        <informe-candidatos-informacion-desactualizada></informe-candidatos-informacion-desactualizada>
      </section>
    `;
  }
}

window.customElements.define('xbeni-page', XbeniPage);
