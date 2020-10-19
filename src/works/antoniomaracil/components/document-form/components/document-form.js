import { LitElement, html, css } from 'lit-element';

export class DocumentForm extends LitElement {
  static get styles() {
    return css`
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

  render() {
    return html`
        <div class="container">
            <div class="doc-box">
                <fieldset>
                    <legend>Documentación</legend>
                    <button class="margin-btn">Agregar archivo</button>
                    <div class="table-box">
                        <table class="document-table">
                            <tr>
                                <th>Nombre documento</th>
                                <th>Fecha de carga</th>
                                <th>Eliminar</th>
                            </tr>
                            <tr>
                                <td>EJemplo 1</td>
                                <td>EJemplo 1</td>
                                <td>EJemplo 1</td>
                            </tr>
                        </table>                    
                    </div>

                </fieldset>
            
            </div>
        
        </div>
    
    `;
  }
}
customElements.define('document-form', DocumentForm);
