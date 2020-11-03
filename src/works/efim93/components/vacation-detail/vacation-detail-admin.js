import { LitElement, html } from 'lit-element';
import { svgArrowsSort } from '../../comun_files/svg-icons';
import { dataDetail } from '../../utils/vacation-detail';
import { newStyles } from '../../comun_files/table-responsive-styles';
import { commonStyles } from '../../utils/common-styles';

class VacationDetailAdmin extends LitElement {
  static get styles() {
    return [newStyles, commonStyles];
  }

  static get properties() {
    return {
      listaDatos: { type: Object },
      mensaje: { type: String },
      nElements: { type: Number },
      stepper: { type: Array, attribute: false },
      index: { type: Number, attribute: false },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false },
    };
  }

  constructor() {
    super();
    this.listaDatos = dataDetail;
    this.mensaje = '';
    this.nElements = 10;
    this.stepper = [];
    this.from = 0;
    this.to = this.nElements;
    this.index = 0;
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

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName.includes('listaDatos')) {
        const nPages = Math.ceil(this.listaDatos.length / this.nElements);
        this.stepper = new Array(nPages).fill({});
        this.to = this.nElements;
        this.setActiveStep(this.index);
      }
    });
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

  renderStepper() {
    return html`
      <div class="stepper">
        <div class="step left" @click="${this.prev}">&#x25B7;</div>
        ${this.stepper.map(
          (x, i) => html` <div id="${`_${i}`}" class="step" @click="${() => this.showPage(i)}">${i + 1}</div> `,
        )}
        <div class="step" @click="${this.next}">&#x25B7;</div>
      </div>
    `;
  }

  calculaDias(f1, f2) {
    const milisegundos = new Date(f2) - new Date(f1);
    const fines = this.cuentaFindes(new Date(f1), new Date(f2));
    return Math.ceil(milisegundos / (24 * 60 * 60 * 1000) + 1) - fines;
  }

  cuentaFindes(inicio, fin) {
    const timeDiff = Math.abs(fin.getTime() - inicio.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let cuentaFinde = 0;
    const array = new Array(diffDays);
    for (var i = 0; i < array.length; i++) {
      if ([0, 6].includes(inicio.getDay())) {
        cuentaFinde++;
      }
      inicio.setDate(inicio.getDate() + 1);
    }
    return cuentaFinde;
  }

  render() {
    return html`
      <table id="tabla">
        <thead>
          <tr>
            <th>
              <label for="FechadeSolicitud">Dia de inicio de vacaciones</label>
              <button @click="${() => this.orderList('fecha_inicio')}" class="order">${svgArrowsSort}</button>
            </th>
            <th>
              <label for="FechadeInicio">Día Fin de Vacaciones</label>
              <button @click="${() => this.orderList('fecha_final')}" class="order">${svgArrowsSort}</button>
            </th>
            <th>
              <label for="fechafinal">Días</label>
            </th>
          </tr>
        </thead>
        <tbody>
          ${this.listaDatos.slice(this.from, this.to).map(
            (item, i) => html`
              <tr class="${i % 2 === 0 ? 'fila_par' : 'fila_impar'}">
                <td><label for="${item.fecha_inicio}">${item.fecha_inicio}</label></td>
                <td><label for="${item.fecha_fin}">${item.fecha_fin}</label></td>
                <td><label for="dias">${this.calculaDias(item.fecha_inicio, item.fecha_fin)}</label></td>
              </tr>
            `,
          )}
        </tbody>
      </table>
      <div id="paginator">${this.renderStepper()}</div>
    `;
  }
}

window.customElements.define('vacation-detail-admin', VacationDetailAdmin);
