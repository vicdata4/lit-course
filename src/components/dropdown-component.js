/* eslint-disable no-alert */
import { LitElement, html, css } from 'lit-element';

class DropdownComponent extends LitElement {
  static get styles() {
    return [
      css`
        .content {
          display: none;
          background-color: red;
        }

        .content.show {
          display: block;
        }
      `,
    ];
  }

  openCloseDropdown() {
    const content = this.shadowRoot.querySelector('.content');

    if (content.classList.contains('show')) {
      content.classList.remove('show');
    } else {
      content.classList.add('show');
    }
  }

  render() {
    return html`
      <button class="btn-submit" @click="${this.openCloseDropdown}">dropdown</button>
      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel luctus libero. Fusce et erat porttitor, mattis
        neque id, rhoncus augue. Quisque vel interdum diam. Quisque aliquet hendrerit nulla eu accumsan. Pellentesque
        turpis elit, accumsan consectetur felis ac, pulvinar tristique risus
      </div>
    `;
  }
}

window.customElements.define('dropdown-component', DropdownComponent);
