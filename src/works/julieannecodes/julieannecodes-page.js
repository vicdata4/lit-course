import { LitElement, html, css } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './vacationHistoryEmp/vacation-history';
import './VacationRequests/vacation-table';

const components = {
  vacationTable: () => html`<vacation-table></vacation-table>`,
  vacationHistory: () => html`<vacation-history></vacation-history>`,
};
class JulieannecodesPage extends LitElement {
  static get styles() {
    return [
      commonStyles,
      css`
        .container.mine {
          padding: 10px;
        }
        * {
          font-family: Roboto, 'Open Sans';
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
    this.current = 'vacationHistory';
  }

  setComponent(component) {
    this.current = component;
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container mine">
        <work-header>julieanneCodes</work-header>
        <div>
          ${Object.keys(components).map(
            (item) => html` <button @click="${() => this.setComponent(item)}">${item}</button> `,
          )}
        </div>
        ${components[this.current]()}
      </section>
    `;
  }
}

window.customElements.define('julieannecodes-page', JulieannecodesPage);
