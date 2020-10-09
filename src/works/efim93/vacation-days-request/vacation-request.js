import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { formatDate } from './utils/functions';

class VacationRequest extends LitElement {
  static get styles() {
    return [
      css`
    #alerta {
      margin-top:15px;
      display: none;
    }

    #tabla {
      margin-top: 15px;
    }
    
    table {
      border: 1px solid #e4e4e4;
      padding: 10px;
    }
    
    tr {
      text-align: left;
    }

    td {
      min-width: 200px; 
    }
    `];
  }

  static get properties() {
    return {
      listaDatos: { type: Array },
      mensaje: { type: String }
    };
  }

  constructor() {
    super();
    this.listaDatos = [];
    this.mensaje = '';
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
      if (!n) {
        const item = {
          fsolicitud: formatDate(new Date()).completo,
          inicio: formatDate(fIni.value).default,
          final: formatDate(fFin.value).default,
          estado: false,
          festado: formatDate(new Date()).completo
        };
        this.listaDatos = [...[item], ...this.listaDatos];
        fIni.value = null;
        fFin.value = null;
        alerta.style.display = 'none';
      }
    }
  };

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

  compruebaEstado(index) {
    for (const item in this.listaDatos) {
      if ([item].includes(index)) {
        if (this.listaDatos[item].estado) {
          return true;
        }
        return false;
      }
    }
  }

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

  render() {
    return html`
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <section class="container">
    <h1>Solicitud de Vacaciones</h1>
        <label for="fechaInicio" >Fecha Inicio</label>
        <input type="date" class="btn-clck" id="fechaIni" name="fechaIni" min="${formatDate(new Date()).amd}" max="${formatDate(new Date()).year + 1}-12-31" @blur="${this.calculaFin}"  />
        <label for="fechaFin" >Fecha Fin</label>
        <input type="date" class="btn-clck" id="fechaFin" />
        <button id="guardar" class="btn btn-info" @click="${this.addArray}" >Agregar</button>
        <div class="alert alert-danger" role="alert" id="alerta">${this.mensaje}</div>
        <br />
        <table id="tabla" class="table table-striped">
          <thead>
          <tr>  
            <th>Fecha de solicitud</th>
            <th>Fecha de inicio</th>
            <th>Fecha Final</th>
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
          <td><button @click="${() => this.deleteArray(i)}">borrar</button></td>
          </tr>
          `)}
          </tbody>       
        </table>
</section>`;
  }
}

window.customElements.define('vacation-request', VacationRequest);
