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
    alerta.style.display = 'block';
   ((fIni.value ===  nothing) || (fFin.value ===  nothing)) ? alerta.innerHTML = '' : alerta.innerHTML = 'Seleccione la fecha de inicio y final !';
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
      alerta.style.display='none';
      }
    }
  };
  
  compruebaRangos(f){
    const alerta = this.shadowRoot.querySelector('#alerta');
    for (let item in this.listaDatos) {
      if (this.listaDatos[item].inicio.includes(f) || this.listaDatos[item].final.includes(f)) {
        alerta.innerHTML = 'Has planificado ya para esta fecha !!! <br /> Por favor seleccione otra fecha';
        alerta.style.display = 'block';
        return true;
      }
      return false;
    }
  }

  compruebaEstado(index){
    for (let item in this.listaDatos) {
      if (item == index) {
        if (this.listaDatos[item].estado === "Pendiente de aprobación") {
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
        alerta.innerHTML = 'No puedes borrar vacacione aprobadas !!!';
        alerta.style.display = 'block';
      }
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
        out.setAttribute('max', `${yy + 1}-12-31`);
      } else {
        out.setAttribute('max', `${yy + 1}-12-31`);
      }
    }
  }
  ordenarFsolicitud() {
    const array = this.listaDatos;
    array.sort(function (a, b) {
      if (a.fsolicitud > b.fsolicitud) {
        return 1;
      }
      if (a.fsolicitud < b.fsolicitud) {
        return -1;
      }
      return 0;
    });
      this.listaDatos=[...array];
    }

  ordenarInicio() {
    const array = this.listaDatos;
    array.sort(function (a, b) {
      if (a.inicio > b.inicio) {
        return 1;
      }
      if (a.inicio < b.inicio) {
        return -1;
      }
      return 0;
    });
      this.listaDatos=[...array];
    }

  ordenarFin() {
    const array = this.listaDatos;
    array.sort(function (a, b) {
      if (a.final> b.final) {
        return 1;
      }
      if (a.final < b.final) {
        return -1;
      }
      return 0;
    });
      this.listaDatos=[...array];
  }

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
        <input type="date" class="btn-clck" id="fechaIni" name="fechaIni" min="${dateFormatter(new Date()).amd}" max="${dateFormatter(new Date()).year + 1}-12-31" @blur="${this.calculaFin}"  />
        <label for="fechaFin" >Fecha Fin</label>
        <input type="date" class="btn-clck" id="fechaFin" />
        <button id="guardar" class="btn btn-info" @click="${this.addArray}" >Agregar</button>
        <div class="alert alert-danger" role="alert" id="alerta"></div>
        <br />
        <table id="tabla" class="table table-striped">
          <thead>
          <tr>  
            <th>Fecha de solicitud <button id="fsolicitud" @click="${() => this.ordenarFsolicitud()}" ><i class="fas fa-sort fa-2x"></i></button></th>
            <th>Fecha de inicio <button id="inicio" @click="${() => this.ordenarInicio()}" ><i class="fas fa-sort fa-2x"></i></button></th>
            <th>Fecha Final <button id="fin" @click="${() => this.ordenarFin()}" ><i class="fas fa-sort fa-2x"></i></button></th>
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
          <td>${item.estado}</td>
          <td>${item.festado}</td>
          <td><button @click="${() => this.deleteArray(i)}"><i class="far fa-trash-alt fa"></i></button></td>
          </tr>
          `)}
          </tbody>       
        </table>    
</section>`;
  }
}

window.customElements.define('solicitud-vacaciones', SolicitudVacaciones);
