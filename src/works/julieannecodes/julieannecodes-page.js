import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './VacationRequests/vacation-table';

class JulieannecodesPage extends LitElement {
  static get styles() {
    return [commonStyles];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>julieanneCodes</work-header>
        <vacation-table></vacation-table>
      </section>
    `;
  }
}

window.customElements.define('julieannecodes-page', JulieannecodesPage);
