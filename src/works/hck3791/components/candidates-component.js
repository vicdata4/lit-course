/* eslint-disable indent */
import { LitElement, html } from 'lit-element';
import { candidates } from '../cand';
import { candidatesStyle } from '../styles/styles';

class CandidatesComponent extends LitElement {
  static get styles() {
    return [
      candidatesStyle
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
    this.orderedCandidatesList = this.candidates;
    this.typeOrder = '';
  }

  sortByName() {
    if (this.typeOrder !== 'ordered') {
      this.typeOrder = 'ordered';
      this.orderedCandidatesList.sort((a, b) => {
        console.log(a.name, b.name);
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    } else {
      this.typeOrder = '';
      this.orderedCandidatesList.reverse();
    }

    this.requestUpdate();
  }

  sortByEmail() {
    if (this.typeOrder !== 'ordered') {
      this.typeOrder = 'ordered';
      this.orderedCandidatesList.sort((a, b) => {
        if (a.email < b.email) return -1;
        if (a.email > b.email) return 1;
        return 0;
      });
    } else {
      this.typeOrder = '';
      this.orderedCandidatesList.reverse();
    }

    this.requestUpdate();
  }

  sortByOnStaff() {
    if (this.typeOrder !== 'ordered') {
      this.typeOrder = 'ordered';
      this.orderedCandidatesList.sort((a, b) => {
        if (a.onStaff > b.onStaff) return -1;
        if (a.onStaff < b.onStaff) return 1;
        return 0;
      });
    } else {
      this.typeOrder = '';
      this.orderedCandidatesList.reverse();
    }

    this.requestUpdate();
  }

  sortByLastUpdate() {
    if (this.typeOrder !== 'ordered') {
      this.typeOrder = 'ordered';
      this.orderedCandidatesList.sort((a, b) => {
        if (a.lastUpdate < b.lastUpdate) return -1;
        if (a.lastUpdate > b.lastUpdate) return 1;
        return 0;
      });
    } else {
      this.typeOrder = '';
      this.orderedCandidatesList.reverse();
    }

    this.requestUpdate();
  }

  sortByExpDate() {
    if (this.typeOrder !== 'ordered') {
      this.typeOrder = 'ordered';
      this.orderedCandidatesList.sort((a, b) => {
        if (a.expirationDate < b.expirationDate) return -1;
        if (a.expirationDate > b.expirationDate) return 1;
        return 0;
      });
    } else {
      this.typeOrder = '';
      this.orderedCandidatesList.reverse();
    }

    this.requestUpdate();
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
                <img src="/assets/hck3791/icons/double-arrow.png" @click="${this.sortByName}">
              </div>
            </th>
            <th>
              <div>
                <span>Correo electrónico</span>
                <img src="/assets/hck3791/icons/double-arrow.png" @click="${this.sortByEmail}">
              </div>
            </th>
            <th>Teléfono</th>
            <th>Perfil</th>
            <th>
              <div>
                <span>En plantilla</span>
                <img src="/assets/hck3791/icons/double-arrow.png" @click="${this.sortByOnStaff}">
              </div>
            </th>
            <th>
              <div>
                <span>Fecha de última actualización de datos</span>
                <img src="/assets/hck3791/icons/double-arrow.png" @click="${this.sortByLastUpdate}">
              </div>
            </th>
            <th>
              <div>
                <span>Fecha de vencimiento</span>
                <img src="/assets/hck3791/icons/double-arrow.png" @click="${this.sortByExpDate}">
              </div>
            </th>
            <th>Semáforo</th>
          </tr>
        </thead>
        <tbody id="candidatesTableBody">
        ${this.orderedCandidatesList.map((candidate) => {
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
