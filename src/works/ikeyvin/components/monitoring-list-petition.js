import { LitElement, html } from 'lit-element';
import { dateFormatter } from '../utils/functions';
import './form-petition';
import { tablePeticion } from '../utils/costum-css';
import { getInfoPetitions, addPetition, deletePetition, updatePetition } from '../utils/api/api-request.js';

class TestListPetition extends LitElement {
  static get styles() {
    return [tablePeticion];
  }

  static get properties() {
    return {
      listaPeticiones: { type: Array },
    };
  }

  constructor() {
    super();
    this.listaPeticiones = [];
  }

  async firstUpdated() {
    await this.getList();
  }

  async getList() {
    const request = await getInfoPetitions();
    if (!request.error) {
      this.listaPeticiones = [...request.data];
    } else if (request.errorCode === 500) {
      // eslint-disable-next-line no-alert
      alert(request.error);
    }
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('add-petition', async (e) => {
      const request = await addPetition(e.detail);
      if (!request.error) await this.getList();
    });

    window.addEventListener('delete-petition', async (e) => {
      const request = await deletePetition(e.detail);
      if (!request.error) await this.getList();
    });

    window.addEventListener('update-petition', async (e) => {
      const request = await updatePetition(e.detail);
      if (!request.error) await this.getList();
    });
  }

  async setPetition(id) {
    this.listaPeticiones.map((peticion) => {
      if (peticion.id === id) {
        const event = new CustomEvent('set-petition', {
          detail: {
            id: peticion.id,
            titulo: peticion.titulo,
            descripcion: peticion.descripcion,
            fecha: peticion.fecha,
            cliente: peticion.cliente,
            candidato: peticion.candidato,
            publicar: peticion.publicar,
          },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(event);
      }
    });
    await this.updateComplete;
  }

  render() {
    if (this.listaPeticiones !== null) {
      return html`
        <section class="listaPeticiones">
          <table class="table-container">
            <thead>
              <tr>
                <th>Título</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Candidato</th>
                <th>Publicado</th>
              </tr>
            </thead>
            <tbody>
              ${this.listaPeticiones.map(
                (peticion) =>
                  html`
                    <tr>
                      <td>
                        <a @click="${() => this.setPetition(peticion.id)}">${peticion.titulo}</a>
                      </td>
                      <td class="date">${dateFormatter(peticion.fecha).dateHour}</td>
                      <td>${peticion.cliente}</td>
                      <td>${peticion.candidato}</td>
                      <td>${peticion.publicar}</td>
                    </tr>
                  `,
              )}
            </tbody>
          </table>
        </section>
      `;
    } else {
      return html` <section class="listaPeticiones">
        <table class="table-container">
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Candidato</th>
              <th>Publicado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Empty</td>
              <td>Empty</td>
              <td>Empty</td>
              <td>Empty</td>
              <td>Empty</td>
            </tr>
          </tbody>
        </table>
      </section>`;
    }
  }
}

window.customElements.define('test-list-petition', TestListPetition);
