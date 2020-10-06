import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './efim93/ITEM003/solicitud-vacaciones'

class Efim93Page extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>efim93</work-header>
        <solicitud-vacaciones></solicitud-vacaciones>
      </section>
    `;
  }
}

window.customElements.define('efim93-page', Efim93Page);