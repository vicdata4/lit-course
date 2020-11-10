import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { dateFormatter } from '../../utils/functions';
import { material } from '../../utils/fonts';

class ItemList extends LitElement {
  static get styles() {
    return [
      material,
      css`
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        td,
        th {
          border: 1px solid #ffffff;
          text-align: left;
          padding: 8px;
        }

        tr:nth-child(even) {
          background-color: #f7f7f7;
        }

        tr .edit-switch,
        tr td input,
        .edit .info,
        .edit .actions {
          display: none;
        }

        .edit td input,
        .edit .edit-switch {
          display: block;
        }
      `,
    ];
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

  deleteItem(id) {
    const event = new CustomEvent('delete-item', { detail: { id } });
    this.dispatchEvent(event);
  }

  showRowEditor(id) {
    this.shadowRoot.querySelectorAll('tr').forEach((item) => {
      item.classList.remove('edit');
    });

    const row = this.shadowRoot.querySelector(`#_${id}`);
    row.classList.add('edit');
  }

  cancelEdition(index, id) {
    const row = this.shadowRoot.querySelector(`#_${index}`);
    row.classList.remove('edit');

    const { original, name, date } = this.getEdition(index, id);
    name.value = original.name;
    date.value = dateFormatter(original.date).input;
    this.enableSaveBtn(index, id);
  }

  saveEdition(index, id) {
    const { date, name } = this.getEdition(index, id);

    const event = new CustomEvent('update-item', {
      detail: {
        body: {
          id,
          name: name.value,
          date: new Date(date.value),
        },
        index,
      },
    });

    this.dispatchEvent(event);
  }

  enableSaveBtn(index, id) {
    const { original, name, isEditedDate } = this.getEdition(index, id);
    this.shadowRoot.querySelector(`#sb-${index}`).disabled = !(name.value !== original.name || isEditedDate);
  }

  getEdition(index, id) {
    const row = this.shadowRoot.querySelector(`#_${index}`);
    const name = row.querySelector('input[type=text]');
    const date = row.querySelector('input[type=date]');

    const original = this.list.find((x) => x._id === id);
    const isEditedDate = new Date(date.value).toDateString() !== new Date(original.date).toDateString();

    return {
      name,
      date,
      original,
      isEditedDate,
    };
  }

  render() {
    return this.list.length > 0
      ? html`
          <table>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th></th>
            </tr>
            ${this.list.map(
              (item, i) => html`
                <tr id="_${i}">
                  <td>
                    <span class="info">${item.name}</span>
                    <input type="text" @keyup="${() => this.enableSaveBtn(i, item._id)}" value="${item.name}" />
                  </td>
                  <td>
                    <span class="info">${dateFormatter(item.date).default}</span>
                    <input
                      type="date"
                      @change="${() => this.enableSaveBtn(i, item._id)}"
                      value="${dateFormatter(item.date).input}"
                    />
                  </td>
                  <td>
                    <div class="actions">
                      <button @click="${() => this.showRowEditor(i)}"><span class="material-icons">edit</span></button>
                      <button @click="${() => this.deleteItem(item._id)}">
                        <span class="material-icons">delete</span>
                      </button>
                    </div>
                    <div class="edit-switch">
                      <button id="sb-${i}" @click="${() => this.saveEdition(i, item._id)}" disabled>Save</button>
                      <button @click="${() => this.cancelEdition(i, item._id)}">Cancel</button>
                    </div>
                  </td>
                </tr>
              `,
            )}
          </table>
        `
      : nothing;
  }
}

window.customElements.define('item-list', ItemList);
