import { LitElement, html } from 'lit-element';
import { commonStyles } from './utills/common-styles';
import { dataRequest } from './utills/request';

class HolidayApproval extends LitElement {
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
    this.nElements = 3;
    this.stepper = [];
    this.from = 0;
    this.to = this.nElements;
    this.index = 0;
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
            <th>Nombre Apellido</th>
            <th>Fecha de Solicitud</th>
            <th>Fecha de inicio</th>
            <th>Fecha Final</th>
            <th>Estado</th>
            <th>Fecha de Estado</th>
          </tr>
          </thead>
           <tbody>   
                ${this.listaDatos.slice(this.from, this.to).map((item, i) => html`  
                <tr>
                    <td>${item.nombre_apellido}</td>
                    <td>${item.fecha_solicitud}</td>
                    <td>${item.fecha_inicio}</td>
                    <td>${item.fecha_fin}</td>
                    <td>${this.getEstado(item.estado)}</td>
                    <td>${item.fecha_estado}</td>
                </tr> `)}
            </tbody>       
        </table>
        ${this.renderStepper()}
        </section>
      `;
  }
}

window.customElements.define('holiday-approval', HolidayApproval);
