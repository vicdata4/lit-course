/* eslint-disable no-console */
import { LitElement, html, css } from 'lit-element';
import { formatDate } from './../../../utils/functions';

export class DocumentList extends LitElement {
  static get styles() {
    return css`
      .container {
        width: 100%;
        font-family: 'Open Sans', sans-serif, Arial;
        letter-spacing: 0.4px;
      }

      .row > * {
        text-align: left;
        padding-right: 10px;

        height: 30px;
        line-height: 30px;
      }

      .row > *,
      .info-container {
        white-space: nowrap;
        overflow: hidden;
      }

      .row.header {
        margin-bottom: 20px;
      }

      .row.header > * {
        letter-spacing: 1.2px;
        color: #959595;
      }

      .row {
        display: flex;
        flex-flow: row nowrap;
        border-bottom: 1px solid #ebebeb;
        padding: 10px 0px;
      }

      .row:first-child {
        border: none;
      }
      .title {
        width: 70%;
        color: #285659;
      }

      .date {
        display: none;
        width: 20%;
      }

      .light-grey {
        color: #747474;
      }

      .info {
        width: 20%;
      }

      .info-container {
        display: block;
      }

      .row.data {
        margin-bottom: 40px;
      }
      .italic {
        font-style: italic;
      }

      @media (min-width: 768px) {
        .title {
          width: 40%;
        }

        .date {
          display: block;
        }

        .info-container {
          display: none;
        }

        .row {
          padding: 20px 0px;
        }

        .row.header {
          margin-bottom: 0px;
        }

        .row.data {
          margin-bottom: 0px;
        }

        .row.data:hover {
          background-color: #f5f6f7;
        }
      }
    `;
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
