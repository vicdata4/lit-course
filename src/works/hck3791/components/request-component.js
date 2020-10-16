import { LitElement, html } from 'lit-element';
import { request } from '../resources/request';
import { requestStyles } from '../styles/requestStyles';

class RequestComponent extends LitElement {
  static get styles() {
    return [
      requestStyles
    ];
  }

  static get properties() {
    return {
      requestList: { type: Array },
      request: { type: Object }
    };
  }

  constructor() {
    super();
    this.requestList = request;
  }

  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    this.request = request.find(r => r.id === id);
  }

  render() {
    return html`
    <div id='request-container'>
      <section>
        <div id='titles'>
          <h3>Título: ${this.request.title}</h3>
          <h3>Fecha de publicación: ${this.request.datePublication}</h3>
        </div>
        <div id='description'>
          <h3>Descripción:</h3>
          <div id='content'>
            <p>Requisitos:</p>
            <p>${this.request.requirements[0]}</p>
            <p>Lugar de trabajo: ${this.request.requirements[1]}</p>
            <p>Actividades:</p>
            <p class='many'>${this.request.requirements[2].join(', ')}</p>
          </div>
        </div>
      </section>
    </div>
    `;
  }
}

customElements.define('request-component', RequestComponent);
