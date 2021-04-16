/* eslint-disable no-alert */
import { LitElement, html, css } from 'lit-element';

class DropdownComponent extends LitElement {
  static get styles() {
    return [
      css`
        .content {
          display: none;
          background-color: lightskyblue;
        }

        .content.show {
          display: block;
        }
        .btn-submit {
          background-color: white;
          color: black;

          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          padding: 16px 32px;
          border-radius: 5px;
        }

        .btn-submit:hover {
          background-color: lightblue;
          color: white;
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
      <button class="btn-submit" @click="${this.openCloseDropdown}">Dropdown</button>
      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel luctus libero. Fusce et erat porttitor, mattis
        neque id, rhoncus augue. Quisque vel interdum diam. Quisque aliquet hendrerit nulla eu accumsan. Pellentesque
        turpis elit, accumsan consectetur felis ac, pulvinar tristique risus
      </div>
    `;
  }
}

window.customElements.define('dropdown-component', DropdownComponent);
