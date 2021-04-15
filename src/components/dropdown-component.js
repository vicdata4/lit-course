/* eslint-disable no-alert */
import { LitElement, html, css } from 'lit-element';

class DropdownComponent extends LitElement {
  static get styles() {
    return [css``];
  }

  render() {
    return html` <button class="btn-submit">dropdown</button> `;
  }
}

window.customElements.define('dropdown-component', DropdownComponent);
