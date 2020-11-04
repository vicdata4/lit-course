import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import { dates, documents } from './utils/data';
import './holidays-info/holidays-info';
import './admin-docs/admin-docs';
import '../../components/common-header';
import '../../components/work-header';

const components = {
  infoVacaciones: () => html`<holidays-info .list="${dates}" .nElements="${5}"></holidays-info>`,
  adminDocs: () => html`<admin-docs .list="${documents}"></admin-docs>`,
};

class Andresclase1234Page extends LitElement {
  static get styles() {
    return [commonStyles];
  }

  static get properties() {
    return {
      current: { type: String, attribute: false },
    };
  }

  constructor() {
    super();
    this.current = 'infoVacaciones';
    this.current = 'adminDocs';
  }

  setComponent(component) {
    this.current = component;
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>andresclase1234</work-header>
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

window.customElements.define('andresclase1234-page', Andresclase1234Page);
