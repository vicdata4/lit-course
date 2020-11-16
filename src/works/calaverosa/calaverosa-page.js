import { LitElement, html, css } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './resumen-etapas/item-011.js';
import './permissions-report/permissions-report-detailed.js';
import './permissions-report/header-permissions.js';

const components = {
  summaryStagesComponent: () => html`<item-011></item-011>`,
  permissionsReportComponent: () => html`<permissions-report-detailed></permissions-report-detailed>`,
};

class CalaverosaPage extends LitElement {
  static get styles() {
    return [
      commonStyles,
      css`
        item-011 {
          display: block;
          margin-top: 50px;
        }
      `,
    ];
  }

  static get properties() {
    return {
      current: { type: String, attribute: false },
    };
  }

  constructor() {
    super();
    this.current = 'summaryStagesComponent';
  }

  setComponent(component) {
    this.current = component;
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>Calaverosa</work-header>
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

window.customElements.define('calaverosa-page', CalaverosaPage);
