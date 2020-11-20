import { LitElement, html } from 'lit-element';
import { dateFormatter } from '../utils/functions';
import './form-petition';
import { tablePeticion, modalPopup } from '../utils/costum-css';

class TestListPetition extends LitElement {
  static get styles() {
    return [tablePeticion, modalPopup];
  }

  static get properties() {
    return {
      listaPeticiones: { type: Array },
    };
  }

  constructor() {
    super();
    this.listaPeticiones =
      this.listaPeticiones === null ? [] : JSON.parse(window.localStorage.getItem('list-peticion'));
  }

  connectedCallback() {
    super.connectedCallback();
    let storedPeticion = JSON.parse(window.localStorage.getItem('list-peticion'));
    storedPeticion = storedPeticion === null ? [] : storedPeticion;

    window.addEventListener('send-petition', async (e) => {
      storedPeticion.push(e.detail);

      localStorage.setItem('list-peticion', JSON.stringify(storedPeticion));
      this.listaPeticiones = JSON.parse(window.localStorage.getItem('list-peticion'));
      await this.requestUpdate();
    });

    window.addEventListener('delete-petition', async (e) => {
      const array = storedPeticion;
      array.splice(e.detail.index, 1);
      localStorage.setItem('list-peticion', JSON.stringify(storedPeticion));
      this.listaPeticiones = [...array];
      await this.requestUpdate();
    });

    window.addEventListener('update-petition', async (e) => {
      const array = storedPeticion;
      array[e.detail.index].titulo = e.detail.titulo;
      array[e.detail.index].descripcion = e.detail.descripcion;
      array[e.detail.index].fecha = e.detail.fecha;
      array[e.detail.index].candidato = e.detail.candidato;
      array[e.detail.index].cliente = e.detail.cliente;
      array[e.detail.index].publicar = e.detail.publicar;
      localStorage.setItem('list-peticion', JSON.stringify(storedPeticion));
      this.listaPeticiones = [...array];
      await this.requestUpdate();
    });
  }

  setPetition(id) {
    this.listaPeticiones.map((peticion, i) => {
      if (peticion.id === id) {
        const event = new CustomEvent('set-petition', {
          detail: {
            index: i,
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
