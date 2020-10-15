import { LitElement, html } from 'lit-element';
import { commonStyles } from './utills/common-styles';
import { dataRequest } from './utills/request';
import { svgArrowsSort } from '../comun_files/svg-icons';

class VacationApproval extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  static get properties() {
    return {
      ListaDatos: { type: Array },
      nElements: { type: Number },
      stepper: { type: Array, attribute: false },
      index: { type: Number, attribute: false },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false }
    };
  }

  constructor() {
    super();
    this.listaDatos = dataRequest;
    this.nElements = 10;
    this.stepper = [];
    this.from = 0;
    this.to = this.nElements;
    this.index = 0;
  }

  showOptions(element) {
    if (element === 2) {
      return html`
        <option value="0">${this.getEstado(0)}</option>
        <option value="1">${this.getEstado(1)}</option>
        `;
    } else if (element === 1) {
      return html`
        <option value="0">${this.getEstado(0)}</option>
        <option value="2">${this.getEstado(2)}</option>
        `;
    } else {
      return html`
        <option value="1">${this.getEstado(1)}</option>
        <option value="2">${this.getEstado(2)}</option>
        `;
    }
  }

  getEstado(es) {
    switch (es) {
      case 1:
        return 'Aprobado';
      case 2:
        return 'No Aprobado';
      default:
        return 'Pendiente de Aprobación';
    };
  }

  async firstUpdated() {
    const nPages = Math.ceil(this.listaDatos.length / this.nElements);
    this.stepper = new Array(nPages).fill({});
    this.to = this.nElements;

    await this.updateComplete;
    this.setActiveStep(this.index);
  }

  setActiveStep(index) {
    this.shadowRoot.querySelectorAll('.step').forEach(row => {
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

    if (JSON.stringify(this.listaDatos) === JSON.stringify((orderedList))) {
      orderedList.reverse();
    }

    this.listaDatos = [...orderedList];
    this.showPage(0);
  }

  renderStepper() {
    return html`
      <div class="stepper">
        <div class="step left" @click="${this.prev}">&#x25B7;</div>
        ${this.stepper.map((x, i) => html`
          <div id="${`_${i}`}" class="step" @click="${() => this.showPage(i)}">${i + 1}</div>
        `)}
        <div class="step" @click="${this.next}">&#x25B7;</div>
      </div>
    `;
  }

  render() {
    return html`
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <section>
            <table id="tabla" class="table table-striped">
                <thead>
                    <tr>  
                        <th>
                            <label for="nombreApellido">Nombre Apellido</label>
                            <button @click="${() => this.orderList('nombre_apellido')}" >${svgArrowsSort}</button>
                        </th>
                        <th>
                            <label for="fechadeSolicitud">Fecha de solicitud</label>
                            <button @click="${() => this.orderList('fecha_solicitud')}" >${svgArrowsSort}</button>
                        </th>
                        <th>
                            <label for="fechadeInicio">Fecha de inicio</label>
                            <button @click="${() => this.orderList('fecha_inicio')}" >${svgArrowsSort}</button>
                        </th>
                        <th>
                            <label for="fechafinal">Fecha Final</label>
                            <button @click="${() => this.orderList('fecha_fin')}" >${svgArrowsSort}</button></th>
                        </th>
                        <th><label for="estado">Estado</label></th>
                        <th><label for="fechadeEstado">Fecha de Estado</label></th>
                    </tr>
                </thead>
            <tbody>   
                ${this.listaDatos.slice(this.from, this.to).map((item, i) => html`  
                <tr>
                    <td>${item.nombre_apellido}</td>
                    <td>${item.fecha_solicitud}</td>
                    <td>${item.fecha_inicio}</td>
                    <td>${item.fecha_fin}</td>
                    <td>
                        <select id="selectEstado" name="selectEstado">
                            <option value="${item.estado}" selected>${this.getEstado(item.estado)}</option>
                            ${this.showOptions(item.estado)};   
                        </select>
                    </td>
                    <td>${item.fecha_estado}</td>
                </tr> `)}
            </tbody>       
        </table>
        ${this.renderStepper()}
        </section>
      `;
  }
}

window.customElements.define('vacation-approval', VacationApproval);
