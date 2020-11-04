import { LitElement, html } from 'lit-element';
import { material } from '../utils/fonts';
import { styles } from '../utils/admin-styles';

export class AdminDocs extends LitElement {
  static get styles() {
    return [material, styles];
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
              <tr>
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
