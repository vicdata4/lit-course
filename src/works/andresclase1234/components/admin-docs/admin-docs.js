import { LitElement, html } from 'lit-element';
import { adminStyle } from '../../utils/new-styles';

export class AdminDocs extends LitElement {
  static get styles() {
    return [adminStyle];
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
