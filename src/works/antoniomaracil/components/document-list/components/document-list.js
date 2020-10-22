/* eslint-disable no-console */
import { LitElement, html, css } from 'lit-element';
import { formatDate } from './../../../utils/functions';

export class DocumentList extends LitElement {
  static get styles() {
    return css`

    input[type='file'] {
        color: transparent;
      }
    .table-box{
        border-top: solid 2px black;
        border-bottom: solid 2px black;
        margin-top: 1.5rem;
      }
      .document-table {
        border-collapse: collapse;
        font-size: 0.8rem;
        empty-cells: hide;
        width: 100%;
      }
      .document-table tr:nth-child(even) {
        background-color: #EEEEEE;
      }
      .document-table th{
        border-left: solid 2px black;
        border-right: solid 2px black;
        background-color: #CCCCCC;
        font-size: 0.7rem;
        text-align: left;
      }
      .document-table td{
        border-right: solid 2px black;
        border-left: solid 2px black;
      }
      td{
        height: 2rem;
      }
      .margin-btn{
        margin-top: 2rem;
        margin-bottom: 1rem;
      }
    
    `;
  }

  static get properties() {
    return {
      list: { type: String },
      file: { type: Object },
      id: { type: Number }
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
                <fieldset>
                    <legend>Documentación</legend>
                    <div class="table-box">
                        <table class="document-table">
                            <tr>
                                <th>Nombre documento</th>
                                <th>Fecha de carga</th>
                                <th>Eliminar</th>
                            </tr>
                            ${this.list.map((item, i) => html`
                            <tr>
                              <td><a href="${item.path}" download>${item.name}</a></td>
                              <td>${formatDate(item.uploadDate)}</td>
                              <td><button @click="${() => this.removeDocument(i)}">Eliminar</button></td>
                            `)}
                        </table>                    
                    </div>

                </fieldset>
            
            </div>
        
        </div>
    
    `;
  }
}
customElements.define('document-list', DocumentList);
