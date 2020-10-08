import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import { nothing } from 'lit-html';
import { formatearDate } from '../utils/functions';
import '../components/common-header';

/* clase SolicitudesVacaciones */
class SolicitudVacaciones extends LitElement {
  /**
   * Método que devuelve los estilos personalizados de la hoja de estilos.
   */
  static get styles() {
    return [
      commonStyles
    ];
  }

  /**
   * Método que asigna y devuelve propriedades de la clase.
   */
  static get properties() {
    return {
      listaDatos: { type: Array },
      mensaje: { type: String },
      nElements: { type: Number },
      stepper: { type: Array, attribute: false },
      index: { type: Number, attribute: false },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false }
    };
  }

  /* constructor de la clase */
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

  /**
   * Método que nos añade un objeto con datos de la solicitud es decir un registro al array.
   */
  addArray() {
    const fIni = this.shadowRoot.querySelector('#fechaIni');
    const fFin = this.shadowRoot.querySelector('#fechaFin');
    const alerta = this.shadowRoot.querySelector('#alerta');
    alerta.style.display = 'block';
    this.mensaje = ((fIni.value === nothing) || (fFin.value === nothing)) ? '' : 'Seleccione la fecha de inicio y final !';
    const dateHasValue = fIni !== null && fIni.value !== '' && fFin !== null && fFin.value !== '';
    if (dateHasValue) {
      const n = this.compruebaRangos(formatearDate(fIni.value).default);
      if (!n) {
        const item = {
          fsolicitud: formatearDate(new Date()).completo,
          inicio: formatearDate(fIni.value).default,
          final: formatearDate(fFin.value).default,
          estado: false,
          festado: formatearDate(new Date()).completo
        };
        this.listaDatos = [...[item], ...this.listaDatos];
        fIni.value = null;
        fFin.value = null;
        alerta.style.display = 'none';
      }
    }
  };

  /**
   * Método que nos ayuda a comprobar fecha fin y fecha inicio para no duplicar las solicitudes.
   */
  compruebaRangos(f) {
    const alerta = this.shadowRoot.querySelector('#alerta');
    for (const item in this.listaDatos) {
      if (this.listaDatos[item].inicio.includes(f) || this.listaDatos[item].final.includes(f)) {
        this.mensaje = 'Has planificado ya para esta fecha !!! <br /> Por favor seleccione otra fecha';
        alerta.style.display = 'block';
        return true;
      }
      return false;
    }
  }

  /**
   * Método ayudante que devuelve true o false al compprobar un campo en este caso campo estado.
   */
  compruebaEstado(index) {
    for (const item in this.listaDatos) {
      if (item == index) {
        if (this.listaDatos[item].estado === true) {
          return true;
        }
        return false;
      }
    }
  }

  /**
   * Método que elimina un registro del array de objetos solicitudes, solo se eliminara si el estado es aprobado.
   */
  deleteArray(index) {
    const alerta = this.shadowRoot.querySelector('#alerta');
    const est = this.compruebaEstado(index);
    if (est) {
      const array = this.listaDatos;
      array.splice(index, 1);
      this.listaDatos = [...array];
    } else {
      this.mensaje = 'No puedes borrar vacacione aprobadas !!!';
      alerta.style.display = 'block';
    }
  }

  /**
   * Método que calcula que la fecha final no sea el dia selecionado,
   * se le suma a la fecha seleccionada un dia de forma que las solicitudes no se podran hacer menos de un dia.
   */
  calculaFin() {
    const input = this.shadowRoot.getElementById('fechaIni');
    const out = this.shadowRoot.getElementById('fechaFin');
    const fM = new Date(input.value);
    fM.setDate(fM.getDate() + 1);
    const f = (fM.getMonth() + 1);
    const mm = (f === 10 || f === 11 || f === 12) ? f : `0${f}`;
    const d = fM.getDate();
    const dd = (d === 1 || d === 2 || d === 3 || d === 4 || d === 5 || d === 6 || d === 7 || d === 8 || d === 9) ? `0${d}` : d;
    const yy = fM.getFullYear();
    if (input !== '') {
      out.setAttribute('min', `${yy}-${mm}-${dd}`);
      const f = new Date(input.value);
      if (((f.getMonth() + 1) === 11) || ((f.getMonth() + 1) === 12)) {
        out.setAttribute('max', `${yy + 1}-12-31`);
      } else {
        out.setAttribute('max', `${yy + 1}-12-31`);
      }
    }
  }

  /**
   * Método que ordena un campo en que lo recibe con el id, sobrescribendo el array original.
   */
  ordenar(e) {
    const id = e.currentTarget.id;
    const array = this.listaDatos;
    array.sort(function(a, b) {
      if (a[id] > b[id]) {
        return 1;
      }
      if (a[id] < b[id]) {
        return -1;
      }
      return 0;
    });
    this.listaDatos = [...array];
  }

  /**
   * Método que se ejecuta en la primera ejecucion.
   */
  async firstUpdated() {
    const nPages = (this.listaDatos.length === 0) ? 1 : Math.ceil(this.listaDatos.length / this.nElements);
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

  /**
   * Método que renderiza la plantilla html.
   */
  render() {
    return html`
<common-header></common-header>
 <!-- Bootstrap CSS -->
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <!-- iconos: fontawesone -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  <section class="container">
    <h1>Solicitud de Vacaciones</h1>
        <label for="fechaInicio" >Fecha Inicio</label>
        <input type="date" class="btn-clck" id="fechaIni" name="fechaIni" min="${formatearDate(new Date()).amd}" max="${formatearDate(new Date()).year + 1}-12-31" @blur="${this.calculaFin}"  />
        <label for="fechaFin" >Fecha Fin</label>
        <input type="date" class="btn-clck" id="fechaFin" />
        <button id="guardar" class="btn btn-info" @click="${this.addArray}" >Agregar</button>
        <div class="alert alert-danger" role="alert" id="alerta">${this.mensaje}</div>
        <br />
        <table id="tabla" class="table table-striped">
          <thead>
          <tr>  
            <th>Fecha de solicitud <button id="fsolicitud" @click="${(e) => this.ordenar(e)}" ><i class="fas fa-sort fa-2x"></i></button></th>
            <th>Fecha de inicio <button id="inicio" @click="${(e) => this.ordenar(e)}" ><i class="fas fa-sort fa-2x"></i></button></th>
            <th>Fecha Final <button id="final" @click="${(e) => this.ordenar(e)}" ><i class="fas fa-sort fa-2x"></i></button></th>
            <th>Estado</th>
            <th>Fecha de Estado</th>
            <th>Eliminar</th>
          </tr>
          </thead>
           <tbody>     
        ${this.listaDatos.map((item, i) => html`
          <tr>
          <td>${item.fsolicitud}</td>
          <td>${item.inicio}</td>
          <td>${item.final}</td>
          <td>${item.estado ? 'Aprobado' : 'Pendiente de Aprobación'}</td>
          <td>${item.festado}</td>
          <td><button @click="${() => this.deleteArray(i)}"><i class="far fa-trash-alt fa"></i></button></td>
          </tr>
          `)}
          </tbody>       
        </table>
        ${this.renderStepper()}
</section>`;
  }
}

/**
 * Declaracion y envio del componente con la clase asociada.
 */
window.customElements.define('solicitud-vacaciones', SolicitudVacaciones);
