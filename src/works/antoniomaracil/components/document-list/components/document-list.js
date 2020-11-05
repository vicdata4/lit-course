/* eslint-disable no-console */
import { LitElement, html } from 'lit-element';
import { documentListStyles } from '../../../utils/custom-styles';
import { dateFormatter } from './../../../utils/functions';

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
          <div class="row header">
            <div class="title">Nombre de archivo</div>
            <div class="date">Fecha de subida</div>
            <div class="info">Eliminar</div>
          </div>
          ${this.list.map(
            (item, i) => html`
              <div class="group">
                <div class="info-container">
                  <span class="light-grey italic">${dateFormatter(item.uploadDate).default}</span>
                </div>
                <div class="row data">
                  <div class="title"><a href="${item.path}" download>${item.name}</a></div>
                  <div class="date light-grey">${dateFormatter(item.uploadDate).default}</div>
                  <div class="info">
                    <button @click="${() => this.removeDocument(i)}">
                      <img src="assets/antoniomaracil/remove.png" alt="remove" />
                    </button>
                  </div>
                </div>
              </div>
            `,
          )}
          <div class="row header">
            <div class="title">Nombre de archivo</div>
            <div class="date">Fecha de subida</div>
            <div class="info">Eliminar</div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('document-list', DocumentList);
