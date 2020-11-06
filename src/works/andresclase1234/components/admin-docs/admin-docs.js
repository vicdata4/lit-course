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

      table {
        border: 1px solid #e4e4e4;
        padding: 10px;
        margin-left: 5%;
        margin-right: 5%;
        width: 90%;
      }

      th {
        text-align: left;
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
            <td>Nombre de documento</td>
            <td>Fecha de carga</td>
            <td>Eliminar</td>
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
