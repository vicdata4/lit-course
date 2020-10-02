import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import { dateFormatter } from '../utils/functions';
import { nothing } from 'lit-html';
import '../components/common-header';

class SolicitudVacaciones extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  static get properties() {
    return {
      listaDatos: { type: Array },
    };
  }

  constructor() {
    super();
    this.listaDatos = [];
  }

  addArray(e) {
    const fIni = this.shadowRoot.querySelector('#fechaIni');
    const fFin = this.shadowRoot.querySelector('#fechaFin');
    const alerta = this.shadowRoot.querySelector('#alerta');
   (fIni.value ===  nothing) ? alerta.innerHTML = '' : alerta.innerHTML = 'Seleccione una fecha de inicio !';
   (fFin.value ===  nothing) ? alerta.innerHTML = '' : alerta.innerHTML = 'Seleccion una fecha final !';
    const dateHasValue = fIni !== null && fIni.value !== '' && fFin !== null && fFin.value !== '';
    if(dateHasValue) {
    const n = this.compruebaRangos(dateFormatter(fIni.value).default);
    if(!n){
      const item = {
          fsolicitud: dateFormatter(new Date()).completo,
          inicio: dateFormatter(fIni.value).default,
          final: dateFormatter(fFin.value).default,
          estado: 'Pendiente de aprobación',
          festado: dateFormatter(new Date()).completo,
        };
      this.listaDatos = [...[item], ...this.listaDatos];
      fIni.value =  null;
      fFin.value =  null;
      alerta.innerHTML = '';
      }
    }
  };
  
  compruebaRangos(f){
    const alerta = this.shadowRoot.querySelector('#alerta');
    for(let item in this.listaDatos){
      if( this.listaDatos[item].inicio.includes(f) || this.listaDatos[item].final.includes(f) ){
        alerta.innerHTML='Has planificado ya para esta fecha !!!, Por favor seleccione otra fecha';
        return true;
      }
      return false;
    }
  }

  deleteArray(index) {
    const array = this.listaDatos;
    array.splice(index, 1);
    this.listaDatos = [...array];
  }

  calculaFin() {
    const input = this.shadowRoot.getElementById('fechaIni');
    const out = this.shadowRoot.getElementById('fechaFin');
    const fM = new Date(input.value);
    const tiempo = fM.getTime();
    const milisegundos = 1 * 24 * 60 * 60 * 1000;
    fM.setTime(tiempo + milisegundos);
    const f =(fM.getMonth() + 1);
    const mm = (f === 10 || f === 11 || f === 12) ? f : `0${f}`;
    const d=fM.getDate();
    const dd = (d === 1 || d === 2  || d === 3 || d === 4 || d === 5 || d === 6 || d === 7 || d === 8 || d === 9) ? `0${d}` : d;
    const yy= fM.getFullYear();
    if (input !== '') {
      out.setAttribute('min', `${yy}-${mm}-${dd}`);
      const f = new Date(this.fechaIni);
      if (((f.getMonth() + 1) === 11) || ((f.getMonth() + 1) === 12)) {
        out.setAttribute('max', `${yy}-12-31`);
      } else {
        out.setAttribute('max', `${yy}-12-31`);
      }
    }
  }
  render() {
    return html`
<common-header></common-header>
 <!-- Bootstrap CSS -->
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <section class="container">
    <h1>Solicitud de Vacaciones</h1>
        <label for="fechaInicio" >Fecha Inicio</label>
        <input type="date" class="btn-clck" id="fechaIni" name="fechaIni" min="${dateFormatter(new Date()).amd}" max="${dateFormatter(new Date()).year}-12-31" @blur="${this.calculaFin}"  />
        <label for="fechaFin" >Fecha Fin</label>
        <input type="date" class="btn-clck" id="fechaFin" />
        <button id="guardar" class="btn btn-info" @click="${this.addArray}" >Agregar</button>
        <div class="alert alert-danger" role="alert" id="alerta"></div>
        <br />
        <table id="tabla" class="table table-striped">
          <thead>
          <tr>  
            <th>Fecha de solicitud</th>
            <th>Fecha de inicio</th>
            <th>Fecha Final</th>
            <th>estado</th>
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
          <td>${item.estado}</td>
          <td>${item.festado}</td>
          <td><button @click="${() => this.deleteArray(i)}">&times;</button></td>
          </tr>
          `)}
          </tbody>       
        </table>    
</section>`;
  }
}

window.customElements.define('solicitud-vacaciones', SolicitudVacaciones);
