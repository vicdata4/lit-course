import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/common-styles';
import { dataRequest } from '../../utils/request';
import { svgArrowsSort } from '../../comun_files/svg-icons';
import { ifDefined } from 'lit-html/directives/if-defined';
import { formatDate } from '../../utils/functions';
import { newStyles } from '../../comun_files/table-responsive-styles';

class VacationApproval extends LitElement {
  static get styles() {
    return [newStyles, commonStyles];
  }

  static get properties() {
    return {
      listaDatos: { type: Object },
      nElements: { type: Number },
      options: { type: Object },
      stepper: { type: Array, attribute: false },
      index: { type: Number, attribute: false },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false }
    };
  }

  constructor() {
    super();
    for (const i in dataRequest) {
      const arr = dataRequest[i];
      Array.prototype.fill(formatDate(arr.fecha_solicitud).default, 1, 2);
      Array.prototype.fill(formatDate(arr.fecha_inicio).default, 2, 3);
      Array.prototype.fill(formatDate(arr.fecha_fin).default, 3, 4);
      Array.prototype.fill(formatDate(arr.fecha_estado).default, 5);
    }
    this.listaDatos = dataRequest;
    this.options = [
      { value: '0', text: 'Pendiente de Aprobación' },
      { value: '1', text: 'Aprobado' },
      { value: '2', text: 'No Aprobado' }
    ];
    this.nElements = 10;
    this.stepper = [];
    this.from = 0;
    this.to = this.nElements;
    this.index = 0;
  }

  onSelectChange(event, item, i) {
    const today = new Date();
    if (item.estado !== event.target.value) {
      if (this.listaDatos[i].nombre_apellido.includes(item.nombre_apellido)) {
        this.listaDatos[i] = {
          nombre_apellido: this.listaDatos[i].nombre_apellido,
          fecha_solicitud: this.listaDatos[i].fecha_solicitud,
          fecha_inicio: this.listaDatos[i].fecha_inicio,
          fecha_fin: this.listaDatos[i].fecha_fin,
          estado: event.target.value,
          fecha_estado: formatDate(today).default
        };
        this.listaDatos = [...this.listaDatos];
      }
    }
  }

  async firstUpdated() {
    const nPages = Math.ceil(this.listaDatos.length / this.nElements);
    this.stepper = new Array(nPages).fill({});
    this.to = this.nElements;

    await this.updateComplete;
    this.setActiveStep(this.index);
  }

  setActiveStep(index) {
    this.shadowRoot.querySelectorAll('.step').forEach((row) => {
      if (row.id === `_${index}`) {
        row.classList.add('active');
      } else {
        row.classList.remove('active');
      }
    });
  }

  showPage(index) {
    this.index = index;
    this.from = this.nElements * index;
    this.to = this.from + this.nElements;
    this.setActiveStep(index);
  }

  next() {
    if (this.index < this.stepper.length - 1) {
      this.showPage(this.index + 1);
    }
  }

  prev() {
    if (this.index > 0) {
      this.showPage(this.index - 1);
    }
  }

  orderList(column) {
    const myList = [...this.listaDatos];

    const orderedList = myList.sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });

    if (JSON.stringify(this.listaDatos) === JSON.stringify(orderedList)) {
      orderedList.reverse();
    }

    this.listaDatos = [...orderedList];
    this.showPage(0);
  }

  renderStepper() {
    return html`
      <div class="stepper">
        <div class="step left" @click="${this.prev}">&#x25B7;</div>
        ${this.stepper.map(
    (x, i) => html` <div id="${`_${i}`}" class="step" @click="${() => this.showPage(i)}">${i + 1}</div> `
  )}
        <div class="step" @click="${this.next}">&#x25B7;</div>
      </div>
    `;
  }

  render() {
    return html`
            <table id="tabla">
                <thead>
                    <tr>  
                        <th>
                            <label for="nombreApellido">Nombre Apellido</label>
                            <button @click="${() =>
    this.orderList('nombre_apellido')}" class="order" >${svgArrowsSort}</button>
                        </th>
                        <th>
                            <label for="fechadeSolicitud">Fecha de solicitud</label>
                            <button @click="${() =>
    this.orderList('fecha_solicitud')}" class="order" >${svgArrowsSort}</button>
                        </th>
                        <th>
                            <label for="fechadeInicio">Fecha de inicio</label>
                            <button @click="${() =>
    this.orderList('fecha_inicio')}" class="order" >${svgArrowsSort}</button>
                        </th>
                        <th>
                            <label for="fechafinal">Fecha Final</label>
                            <button @click="${() =>
    this.orderList('fecha_fin')}" class="order" >${svgArrowsSort}</button></th>
                        </th>
                        <th><label for="estado">Estado</label></th>
                        <th><label for="fechadeEstado">Fecha de Estado</label></th>
                    </tr>
                </thead>
                <tbody>   
                    ${this.listaDatos.slice(this.from, this.to).map(
    (item, i) => html`
                        <tr class="${(i % 2) === 0 ? 'fila_par' : 'fila_impar'}">
                          <td><label for="${item.nombre_apellido}">${item.nombre_apellido}</label></td>
                          <td><label for="${item.fecha_solicitud}">${item.fecha_solicitud}</label></td>
                          <td><label for="${item.fecha_inicio}">${item.fecha_inicio}</label></td>
                          <td><label for="${item.fecha_fin}">${item.fecha_fin}</label></td>
                          <td>
                            <select
                              name="selectEstado"
                              id="select"
                              title="selectestado"
                              @change="${(e) => this.onSelectChange(e, item, i)}"
                            >
                              ${this.options.map(
    (option) => html`
                                  <option
                                    selected="${ifDefined(option.value === item.estado ? 'true' : undefined)}"
                                    value="${option.value}"
                                    class="i${option.value}"
                                  >
                                    ${option.text}
                                  </option>
                                `
  )}
                            </select>
                          </td>
                          <td><label for="${item.fecha_estado}">${item.fecha_estado}</label></td>
                        </tr>
                      `
  )}
                </tbody>       
        </table>
        ${this.renderStepper()}
        </section>
      `;
  }
}

window.customElements.define('vacation-approval', VacationApproval);
