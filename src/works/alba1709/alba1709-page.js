import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './solicitudVacaciones/solicitud-vacaciones-view';
import './adminHoliday/admin-holiday-view';

const components = {
  solicitudVacaciones: () => html`<solicitud-vacaciones-view>h</solicitud-vacaciones-view>`,
  adminHoliday: () => html`<admin-holiday-view></admin-holiday-view>`
};

class Alba1709Page extends LitElement {
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
    this.current = 'solicitudVacaciones';
  }

  setComponent(component) {
    this.current = component;
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>alba1709</work-header>
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

window.customElements.define('alba1709-page', Alba1709Page);
