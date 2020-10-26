/* eslint-disable no-console */
import { LitElement, html } from 'lit-element';
import { documentListStyles } from '../../../utils/custom-styles';
import { formatDate } from './../../../utils/functions';

export class DocumentList extends LitElement {
  static get styles() {
    return [documentListStyles];
  }

  static get properties() {
    return {
      list: { type: String },
      file: { type: Object },
      id: { type: Number },
    };
  }

  constructor() {
    super();
    this.list = [];
  }

  removeDocument(index) {
    const newList = [...this.list];
    newList.splice(index, 1);
    this.list = [...newList];
  }

  render() {
    return html`
      <div class="container">
        <div class="doc-box">
          <div class="container">
            <div class="row header">
              <div class="title">Nombre de archivo</div>
              <div class="date">Fecha de subida</div>
              <div class="info">Eliminar</div>
            </div>
            ${this.list.map(
              (item, i) => html`
                <div class="info-container">
                  <span class="light-grey italic">${formatDate(item.uploadDate)}</span>
                </div>
                <div class="row data">
                  <div class="title"><a href="${item.path}" download>${item.name}</a></div>
                  <div class="date light-grey">${formatDate(item.uploadDate)}</div>
                  <div class="info">
                    <button @click="${() => this.removeDocument(i)}">
                      <img src="assets/antoniomaracil/remove.png" alt="remove" />
                    </button>
                  </div>
                </div>
              `,
            )}
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('document-list', DocumentList);
