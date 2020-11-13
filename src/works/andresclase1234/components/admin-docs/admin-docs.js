import { LitElement, html, css } from 'lit-element';

export class AdminDocs extends LitElement {
  static get styles() {
    return css`
      .material-icons {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
      }
      .container {
        width: 100%;
        font-family: Roboto, 'Open Sans';
      }
      table {
        border: 1px solid #ccd0d4;
        border-collapse: collapse;
        margin-left: 1%;
        margin-right: 1%;
        width: 98%;
      }
      tr:first-of-type {
        border: 1px solid #ccd0d4;
      }
      tr:nth-child(even) {
        background-color: #f6f6f6;
      }
      .tdHeader {
        line-height: 19.6px;
        font-size: 14px;
        text-size-adjust: 100%;
        padding: 8px;
        padding-left: 2px;
        text-align: left;
      }
      td {
        font-weight: 500;
        font-size: 13px;
        text-size-adjust: 100%;
      }
      body {
        color: #444;
        line-height: 1.4em;
      }
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
      }
    `;
  }

  static get properties() {
    return {
      list: { type: Array },
    };
  }

  constructor() {
    super();
    this.list = [];
  }

  getFormattedDate(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  remove(index) {
    const newList = [...this.list];
    newList.splice(index, 1);
    this.list = [...newList];
  }

  render() {
    return html`
      <div class="container">
        <table>
          <tr>
            <td class="tdHeader">Nombre de documento</td>
            <td class="tdHeader">Fecha de carga</td>
            <td class="tdHeader">Eliminar</td>
          </tr>
          ${this.list.map(
            (item, i) => html`
              <tr class="documents">
                <td><a href="${item.path}" download>${item.name}</a></td>
                <td>${this.getFormattedDate(item.uploadDate)}</td>
                <td>
                  <button @click="${() => this.remove(i)}">
                    <i class="material-icons main-icon">cancel</i>
                  </button>
                </td>
              </tr>
            `,
          )}
        </table>
      </div>
    `;
  }
}
customElements.define('admin-docs', AdminDocs);
