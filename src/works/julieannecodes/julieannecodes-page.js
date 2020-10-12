import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './approval-table/approval-table';

class JulieannecodesPage extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>julieanneCodes</work-header>
        <approval-table></approval-table>
      </section>
    `;
  }
}

window.customElements.define('julieannecodes-page', JulieannecodesPage);
