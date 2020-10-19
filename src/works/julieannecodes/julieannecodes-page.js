import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './approval-table/approval-table';
import './formularioVacaciones/vacation-table';

const components = { 
  approvalTable: () => html`<approval-table></approval-table>`,
  vacationTable: () => html`<vacation-table></vacation-table>`
};
class JulieannecodesPage extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }
  
  static get properties() {
    return {
      current: {type: String, attribute: false }
    };
  }
  
  constructor() {
    super();
    this.current = 'approvalTable';
  }
  
  setComponent(component) {
    this.current = component;
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>julieanneCodes</work-header>
        <div>
          ${Object.keys(components).map(item => html`
          <button class="" @click="${() => this.setComponent(item)}">${item}</button>
          `)}
        </div>
        ${components[this.current]()}
      </section>
    `;
  }
}

window.customElements.define('julieannecodes-page', JulieannecodesPage);
