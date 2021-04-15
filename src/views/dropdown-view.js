import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import '../components/common-header';

class DropdownView extends LitElement {
  static get styles() {
    return [commonStyles];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">Dropdown</section>
    `;
  }
}

window.customElements.define('dropdown-view', DropdownView);
