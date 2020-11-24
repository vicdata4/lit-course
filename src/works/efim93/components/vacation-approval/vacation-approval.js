import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/common-styles';
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
      listaDatos: { type: Array },
      nElements: { type: Number },
      options: { type: Object },
      stepper: { type: Array, attribute: false },
      index: { type: Number, attribute: false },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false },
    };
  }

  constructor() {
    super();
    this.listaDatos = [];
    this.options = [
      { value: 0, text: 'Pendiente de Aprobación' },
      { value: 1, text: 'Aprobado' },
      { value: 2, text: 'No Aprobado' },
    ];
    this.nElements = 10;
    this.stepper = [];
    this.from = 0;
    this.to = this.nElements;
    this.index = 0;
  }

  onSelectChange(e, item, i, id) {
    if (item.estado !== parseInt(e.target.value)) {
      const event = new CustomEvent('update-reg', {
        detail: {
          id,
          estado: parseInt(e.target.value),
          fecha_estado: new Date(),
        },
      });
      this.dispatchEvent(event);
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
        <div class="step left" id="stepLeft" @click="${this.prev}">&#x25B7;</div>
        ${this.stepper.map(
          (x, i) => html` <div id="${`_${i}`}" class="step" @click="${() => this.showPage(i)}">${i + 1}</div> `,
        )}
        <div class="step" id="stepRight" @click="${this.next}">&#x25B7;</div>
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
              <button @click="${() => this.orderList('nombre_apellido')}" class="order">${svgArrowsSort}</button>
            </th>
            <th>
              <label for="fechadeSolicitud">Fecha de solicitud</label>
              <button @click="${() => this.orderList('fecha_solicitud')}" class="order">${svgArrowsSort}</button>
            </th>
            <th>
              <label for="fechadeInicio">Fecha de inicio</label>
              <button @click="${() => this.orderList('fecha_inicio')}" class="order">${svgArrowsSort}</button>
            </th>
            <th>
              <label for="fechafinal">Fecha Final</label>
              <button @click="${() => this.orderList('fecha_fin')}" class="order">${svgArrowsSort}</button>
            </th>
            <th><label for="estado">Estado</label></th>
            <th><label for="fechadeEstado">Fecha de Estado</label></th>
          </tr>
        </thead>
        <tbody>
          ${this.listaDatos.slice(this.from, this.to).map(
            (item, i) => html`
              <tr class="${i % 2 === 0 ? 'fila_par' : 'fila_impar'}">
                <td><label for="${item.nombre_apellido}">${item.nombre_apellido}</label></td>
                <td>
                  <label for="${formatDate(item.fecha_solicitud).default}">
                    ${formatDate(item.fecha_solicitud).default}
                  </label>
                </td>
                <td>
                  <label for="${formatDate(item.fecha_inicio).default}">
                    ${formatDate(item.fecha_inicio).default}
                  </label>
                </td>
                <td>
                  <label for="${formatDate(item.fecha_fin).default}"> ${formatDate(item.fecha_fin).default} </label>
                </td>
                <td>
                  <select
                    name="selectEstado"
                    class="select"
                    title="selectestado"
                    @change="${(e) => this.onSelectChange(e, item, i, item._id)}"
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
                      `,
                    )}
                  </select>
                </td>
                <td>
                  <label for="${formatDate(item.fecha_estado).completo}">
                    ${formatDate(item.fecha_estado).completo}
                  </label>
                </td>
              </tr>
            `,
          )}
        </tbody>
      </table>
      ${this.renderStepper()}
    `;
  }
}

window.customElements.define('vacation-approval', VacationApproval);
