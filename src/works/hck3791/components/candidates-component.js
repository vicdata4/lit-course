/* eslint-disable indent */
import { LitElement, html } from 'lit-element';
import { candidates } from '../resources/cand';
import { candidatesStyles } from '../styles/candidatesStyles';

class CandidatesComponent extends LitElement {
  static get styles() {
    return [
      candidatesStyles
    ];
  }

  static get properties() {
    return {
      candidates: { type: Array },
      orderedCandidatesList: { type: Array },
      typeOrder: { type: String }
    };
  }

  constructor() {
    super();
    this.candidates = candidates;
  }

  sortColumn(e) {
    const column = e.target.id;
    const toOrder = [...this.candidates];
    const orderedCandidatesList = toOrder.sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });

    if (JSON.stringify(this.candidates) === JSON.stringify(orderedCandidatesList)) {
      orderedCandidatesList.reverse();
    }

    this.candidates = [...orderedCandidatesList];
  }

  render() {
    return html`
      <div id="candidatesContainer">
      <table>
        <caption>Lista de candidatos con información pendiente de actualizar</caption>
        <thead>
          <tr>
            <th>
              <div>
                <span>Nombre</span>
                <img src="/assets/hck3791/icons/double-arrow.png" id="name" @click="${this.sortColumn}">
              </div>
            </th>
            <th>
              <div>
                <span>Correo electrónico</span>
                <img src="/assets/hck3791/icons/double-arrow.png" id="email" @click="${this.sortColumn}">
              </div>
            </th>
            <th>Teléfono</th>
            <th>Perfil</th>
            <th>
              <div>
                <span>En plantilla</span>
                <img src="/assets/hck3791/icons/double-arrow.png" id="onStaff" @click="${this.sortColumn}">
              </div>
            </th>
            <th>
              <div>
                <span>Fecha de última actualización de datos</span>
                <img src="/assets/hck3791/icons/double-arrow.png" id="lastUpdate" @click="${this.sortColumn}">
              </div>
            </th>
            <th>
              <div>
                <span>Fecha de vencimiento</span>
                <img src="/assets/hck3791/icons/double-arrow.png" id="expirationDate" @click="${this.sortColumn}">
              </div>
            </th>
            <th>Semáforo</th>
          </tr>
        </thead>
        <tbody id="candidatesTableBody">
        ${this.candidates.map((candidate) => {
            return html`
            <tr>
              <td><a href="/hck3791-comp?id=${candidate.id}">${candidate.name}</a></td>
              <td>${candidate.email}</td>
              <td>${candidate.phone}</td>
              <td>${candidate.profile}</td>
              <td><input type='checkbox' ?checked='${candidate.onStaff}'></td>
              <td>${candidate.lastUpdate}</td>
              <td>${candidate.expirationDate}</td>
              <td class="semaforo"><img src='/assets/hck3791/icons/${(candidate.light) ? 'green_circle.png' : 'red_circle.png'}'></td>
            </tr>`;
          })}
        </tbody>
      </table>
    </div>
    `;
  }
}

customElements.define('candidates-component', CandidatesComponent);
