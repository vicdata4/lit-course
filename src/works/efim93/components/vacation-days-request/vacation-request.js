import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { formatDate } from '../../utils/functions';
import { svgArrowsSort, svgTrash } from '../../comun_files/svg-icons';
import { newStyles } from '../../comun_files/table-responsive-styles';

class VacationRequest extends LitElement {
  static get styles() {
    return [
      newStyles,
      css`
    #alerta {
      margin-top:15px;
      display: none;
    }

    table{
      margin-top: 15px;
    }

    .order {
      padding: 0;
      background-color: transparent;
      border: none;
      margin-bottom: 10px;
      cursor: pointer;
    }
      
    .stepper {
      margin: 10px 0;
    }

    .stepper .step:hover {
      background-color: #f1f1f1;
    }

    .step {
      display: inline-block;
      padding: 5px;
      border: 1px solid #d8d7d7;
      width: 20px;
      height: auto;
      text-align: center;
      cursor: pointer;
    }

    .step.active {
      background-color: #535353 !important;
      color: white;
    }

    .step.left {
      transform: rotate(180deg);
    }

    .stepper, .step {
      user-select: none;
    }

    .svg_sort, .svg_trash{
      width: 15px;
      height: auto;
      margin: 0;
      cursor: pointer;
      overflow: visible;
      fill: #000;
    }

    `];
  }

  static get properties() {
    return {
      listaDatos: { type: Array, attribute: true },
      mensaje: { type: String },
      nElements: { type: Number },
      stepper: { type: Array, attribute: false },
      index: { type: Number, attribute: false },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false }
    };
  }

  constructor() {
    super();
    this.listaDatos = [];
    this.mensaje = '';
    this.nElements = 10;
    this.stepper = [];
    this.from = 0;
    this.to = this.nElements;
    this.index = 0;
  }

  addArray() {
    const fIni = this.shadowRoot.querySelector('#fechaIni');
    const fFin = this.shadowRoot.querySelector('#fechaFin');
    const alerta = this.shadowRoot.querySelector('#alerta');
    alerta.style.display = 'block';
    this.mensaje = ([fIni.value, fFin.value].includes(nothing)) ? '' : 'Seleccione la fecha de inicio y final !';
    const dateHasValue = fIni !== null && fIni.value !== '' && fFin !== null && fFin.value !== '';
    if (dateHasValue) {
      const n = this.compruebaRangos(formatDate(fIni.value).default);
      const m = this.evitaDuplicados(formatDate(fIni.value).default, formatDate(fFin.value).default);
      if (!n && !m) {
        const item = {
          fsolicitud: formatDate(new Date()).completo,
          inicio: formatDate(fIni.value).default,
          final: formatDate(fFin.value).default,
          estado: 0,
          festado: formatDate(new Date()).completo
        };
        this.listaDatos = [...[item], ...this.listaDatos];
        fIni.value = null;
        fFin.value = null;
        alerta.style.display = 'none';
      } else {
        fIni.value = '';
        fFin.value = '';
      }
    }
  };

  verifica() {
    const fIni = this.shadowRoot.querySelector('#fechaIni');
    const fFin = this.shadowRoot.querySelector('#fechaFin');
    if (fIni.value === '') {
      fFin.value = '';
      fIni.focus();
    }
  }

  evitaDuplicados(a, b) {
    for (const item of this.listaDatos) {
      if (item.inicio.includes(a) && item.final.includes(b)) {
        this.mensaje = `Has solicitado ya vacaciones para estos dias !!!`;
        return true;
      } else {
        return false;
      }
    }
  }

  compruebaRangos(f) {
    const alerta = this.shadowRoot.querySelector('#alerta');
    for (const item in this.listaDatos) {
      if ((this.listaDatos[item].inicio.includes(f) && this.listaDatos[item].final.includes(f) > this.listaDatos[item].inicio.includes(f)) || this.listaDatos[item].final.includes(f)) {
        this.mensaje = `Has planificado ya para esta fecha !!! Por favor seleccione otra fecha`;
        alerta.style.display = 'block';
        return true;
      }
      return false;
    }
  }

  compruebaEstado(index) {
    for (const item in this.listaDatos) {
      if ([item].includes(index.toString())) {
        return this.listaDatos[item].estado;
      }
    }
  }

  deleteArray(index) {
    const alerta = this.shadowRoot.querySelector('#alerta');
    const est = this.compruebaEstado(index);
    if ([0, 2].includes(est)) {
      const array = this.listaDatos;
      array.splice(index, 1);
      this.listaDatos = [...array];
    } else {
      this.mensaje = 'No puedes borrar vacacione aprobadas !!!';
      alerta.style.display = 'block';
    }
  }

  calculaFin() {
    const input = this.shadowRoot.getElementById('fechaIni');
    const out = this.shadowRoot.getElementById('fechaFin');
    const fM = new Date(input.value);
    fM.setDate(fM.getDate() + 1);
    const f = (fM.getMonth() + 1);
    const mm = ([10, 11, 12].includes(f)) ? f : `0${f}`;
    const d = fM.getDate();
    const dd = ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(d)) ? `0${d}` : d;
    const yy = fM.getFullYear();
    if (input !== '') {
      out.setAttribute('min', `${yy}-${mm}-${dd}`);
      const f = new Date(input.value);
      if ([11, 12].includes(f.getMonth() + 1)) {
        out.setAttribute('max', `${yy + 1}-12-31`);
      } else {
        out.setAttribute('max', `${yy + 1}-12-31`);
      }
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
    <section class="container">
      <h1>Solicitud de Vacaciones</h1>
        <div>
          <label for="fechaInicio" >Fecha Inicio</label>
          <input type="date" class="btn-clck" id="fechaIni" name="fechaIni" min="${formatDate(new Date()).amd}" max="${formatDate(new Date()).year + 1}-12-31" @blur="${this.calculaFin}"  />
          <label for="fechaFin" >Fecha Fin</label>
          <input type="date" class="btn-clck" id="fechaFin" @blur="${this.verifica}" />
          <button id="guardar" class="btn btn-info" @click="${this.addArray}" >Agregar</button>
          <div class="alert alert-danger" role="alert" id="alerta">${this.mensaje}</div>
          <br />
          <table class="table table-striped">
            <thead>
            <tr>  
              <th>
                <label for="FechadeSolicitud">Fecha de solicitud</label>
                <button @click="${() => this.orderList('fsolicitud')}" >${svgArrowsSort}</button></th>
              </th>
              <th>
                <label for="FechadeInicio">Fecha de inicio</label>
                <button @click="${() => this.orderList('inicio')}" >${svgArrowsSort}</button></th>
              </th>
              <th>
                <label for="fechafinal">Fecha Final</label>
                <button @click="${() => this.orderList('final')}" >${svgArrowsSort}</button></th>
              </th>
              <th>
                <label for="estado">Estado</label>
              </th>
              <th>
                <label for="fechadeestado">Fecha de Estado</label>
              </th>
              <th>
                <label for="eliminar">Eliminar</label>
              </th>
            </tr>
            </thead>
            <tbody>   
              ${this.listaDatos.slice(this.from, this.to).map((item, i) => html`  
              <tr>
                <td>${item.fsolicitud}</td>
                <td>${item.inicio}</td>
                <td>${item.final}</td>
                <td>
                  ${this.getEstado(item.estado)}
                </td>
                <td>${item.festado}</td>
                <td><button @click="${() => this.deleteArray(i)}">${svgTrash}</button></td>
              </tr> `)}
            </tbody>       
          </table>
          <div id="paginator">${this.renderStepper()}</div>
        </div>
      </section>`;
  }
}

window.customElements.define('vacation-request', VacationRequest);
