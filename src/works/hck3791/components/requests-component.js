import { LitElement, html } from 'lit-element';
import { requestsStyles } from '../styles/requests-styles';

class RequestComponent extends LitElement {
  static get styles() {
    return [requestsStyles];
  }

  static get properties() {
    return {
      data: { type: Array },
      showRequests: { type: Array },
    };
  }

  constructor() {
    super();
    this.showRequests = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.data.forEach((obj) => {
      obj.display ? this.showRequests.push(obj) : false;
    });
  }

  formatDate(d) {
    let day = '';
    let month = '';

    d.getDate() < 10 ? (day += '0' + d.getDate()) : (day += d.getDate());
    d.getMonth() + 1 < 10 ? (month += '0' + (d.getMonth() + 1)) : (month += d.getMonth() + 1);

    return day + '/' + month + '/' + d.getFullYear();
  }

  render() {
    return html`
      <div class="container">
        <table>
          <caption>
            Lista de peticiones
          </caption>
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha de publicación</th>
            </tr>
          </thead>
          <tbody>
            ${this.showRequests.map((obj) => {
              return html`
                <tr>
                  <td data-label="Título"><a href="#">${obj.title}</a></td>
                  <td data-label="Publicación">${this.formatDate(obj.publicationDate)}</td>
                </tr>
              `;
            })}
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define('requests-component', RequestComponent);
