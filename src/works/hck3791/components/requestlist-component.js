import { LitElement, html } from 'lit-element';
import { request } from '../request';
import { requestListStyles } from '../styles/requestStyles';

class RequestListComponent extends LitElement {
  static get styles() {
    return [
      requestListStyles
    ];
  }

  static get properties() {
    return {
      requestList: { type: Array }
    };
  }

  constructor() {
    super();
    this.requestList = request;
  }

  render() {
    return html`
    <div id='requestlist-container'>
      <section>
        <table>
          <caption>Lista de peticiones</caption>
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha de publicación</th>
            </tr>
          </thead>
          <tbody>
            ${this.requestList.map(request => { return html`<tr><td><a href="/request?id=${request.id}">${request.title}</a></td><td>${request.datePublication}</td></tr>`;})}
          </tbody>
        </table>
      </section>
    </div>  
    `;
  }
}

customElements.define('requestlist-component', RequestListComponent);
