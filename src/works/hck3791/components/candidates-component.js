/* eslint-disable indent */
import { LitElement, html } from 'lit-element';
import { CANDIDATES } from '../cand';
import { CAND } from '../styles/styles';

class CandidatesComponent extends LitElement {
  static get styles() {
    return [
      CAND
    ];
  }

  static get properties() {
    return {
      candidates: { type: Array },
      typeOrder: { type: Number }
    };
  }

  constructor() {
    super();
    this.candidates = CANDIDATES;
    this.typeOrder = 0;
  }

  sortByName() {
    const rows = this.shadowRoot.getElementById('candidatesTableBody').rows;
    var order = true;

    if (this.typeOrder === 0) {
      while (order) {
        order = false;

        for (let i = 0; i < (rows.length - 1); i++) {
          const cell1 = rows[i].getElementsByTagName('TD')[0];
          const cell2 = rows[i + 1].getElementsByTagName('TD')[0];

          if (cell1.innerText.toLowerCase() > cell2.innerText.toLowerCase()) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            order = true;
            break;
          }
        }
      }
      this.typeOrder = 1;
    } else {
      while (order) {
        order = false;

        for (let i = 0; i < (rows.length - 1); i++) {
          const cell1 = rows[i].getElementsByTagName('TD')[0];
          const cell2 = rows[i + 1].getElementsByTagName('TD')[0];

          if (cell1.innerText.toLowerCase() < cell2.innerText.toLowerCase()) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            order = true;
            break;
          }
        }
      }
      this.typeOrder = 0;
    }
  }

  sortByEmail() {
    const rows = this.shadowRoot.getElementById('candidatesTableBody').rows;
    var order = true;

    if (this.typeOrder === 0) {
      while (order) {
        order = false;

        for (let i = 0; i < (rows.length - 1); i++) {
          const cell1 = rows[i].getElementsByTagName('TD')[1];
          const cell2 = rows[i + 1].getElementsByTagName('TD')[1];

          if (cell1.innerText.toLowerCase() > cell2.innerText.toLowerCase()) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            order = true;
            break;
          }
        }
      }
      this.typeOrder = 1;
    } else {
      while (order) {
        order = false;

        for (let i = 0; i < (rows.length - 1); i++) {
          const cell1 = rows[i].getElementsByTagName('TD')[1];
          const cell2 = rows[i + 1].getElementsByTagName('TD')[1];

          if (cell1.innerText.toLowerCase() < cell2.innerText.toLowerCase()) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            order = true;
            break;
          }
        }
      }
      this.typeOrder = 0;
    }
  }

  sortByOnStaff() {
    const rows = this.shadowRoot.getElementById('candidatesTableBody').rows;
    var order = true;

    if (this.typeOrder === 0) {
      while (order) {
        order = false;
        for (let i = 0; i < (rows.length - 1); i++) {
          const cell1 = rows[i].getElementsByTagName('INPUT')[0];
          const cell2 = rows[i + 1].getElementsByTagName('INPUT')[0];

          if (cell1.checked < cell2.checked) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            order = true;
            break;
          }
        }
      }
      this.typeOrder = 1;
    } else {
      while (order) {
        order = false;
        for (let i = 0; i < (rows.length - 1); i++) {
          const cell1 = rows[i].getElementsByTagName('INPUT')[0];
          const cell2 = rows[i + 1].getElementsByTagName('INPUT')[0];

          if (cell1.checked > cell2.checked) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            order = true;
            break;
          }
        }
      }
      this.typeOrder = 0;
    }
  }

  sortByLastUpdate() {
    const rows = this.shadowRoot.getElementById('candidatesTableBody').rows;
    var order = true;

    if (this.typeOrder === 0) {
      while (order) {
        order = false;

        for (let i = 0; i < (rows.length - 1); i++) {
          const cell1 = rows[i].getElementsByTagName('TD')[5];
          const cell2 = rows[i + 1].getElementsByTagName('TD')[5];

          if (cell1.innerText.toLowerCase() > cell2.innerText.toLowerCase()) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            order = true;
            break;
          }
        }
      }
      this.typeOrder = 1;
    } else {
      while (order) {
        order = false;

        for (let i = 0; i < (rows.length - 1); i++) {
          const cell1 = rows[i].getElementsByTagName('TD')[5];
          const cell2 = rows[i + 1].getElementsByTagName('TD')[5];

          if (cell1.innerText.toLowerCase() < cell2.innerText.toLowerCase()) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            order = true;
            break;
          }
        }
      }
      this.typeOrder = 0;
    }
  }

  sortByExpDate() {
    const rows = this.shadowRoot.getElementById('candidatesTableBody').rows;
    var order = true;

    if (this.typeOrder === 0) {
      while (order) {
        order = false;

        for (let i = 0; i < (rows.length - 1); i++) {
          const cell1 = rows[i].getElementsByTagName('TD')[6];
          const cell2 = rows[i + 1].getElementsByTagName('TD')[6];

          if (cell1.innerText.toLowerCase() > cell2.innerText.toLowerCase()) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            order = true;
            break;
          }
        }
      }
      this.typeOrder = 1;
    } else {
      while (order) {
        order = false;

        for (let i = 0; i < (rows.length - 1); i++) {
          const cell1 = rows[i].getElementsByTagName('TD')[6];
          const cell2 = rows[i + 1].getElementsByTagName('TD')[6];

          if (cell1.innerText.toLowerCase() < cell2.innerText.toLowerCase()) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            order = true;
            break;
          }
        }
      }
      this.typeOrder = 0;
    }
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
        ${this.candidates.map(candidate => {
            let count = 0;
            // eslint-disable-next-line indent
            return html`<tr>
              ${(Object.values(candidate)).map(value => {
                  if (typeof (value) !== 'boolean') {
                      return html`<td>${value}</td>`;
                  } else {
                      if (count === 0) {
                          count++;
                          return html`<td><input type='checkbox' ?checked='${value}'></td>`;
                      } else {
                          if (value === true) {
                              return html`<td class="semaforo"><img src='/assets/hck3791/icons/green_circle.png'></td>`;
                          } else {
                              return html`<td class="semaforo"><img src='/assets/hck3791/icons/red_circle.png'></td>`;
                          }
                      }
                  }
              })}
            </tr>`;
          })}
        </tbody>
      </table>
    </div>
    `;
  }
}

customElements.define('candidates-component', CandidatesComponent);
