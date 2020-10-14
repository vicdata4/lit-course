import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './adminHoliday/admin-holiday-view';

class Alba1709Page extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>alba1709</work-header>
        <admin-holiday-view></admin-holiday-view>
      </section>
    `;
  }
}

window.customElements.define('alba1709-page', Alba1709Page);
