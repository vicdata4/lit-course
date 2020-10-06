import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import { nothing } from 'lit-html';
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
    };
  }

  /* constructor de la clase */
  constructor() {
    super();
    this.listaDatos = [];
  }

  formatearDate = (date_) => {
    const date = new Date(date_);
  
    const monthDay = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    const weekDayName = days[date.getDay()];
    const hour = date.getHours();
    const minute = date.getMinutes();
    const f = (date.getMonth() + 1);
    const mes = (f === 10 || f === 11 || f === 12) ? f : `0${f}`;
    const dd = (monthDay === 1 || monthDay === 2  || monthDay === 3 || monthDay === 4 || monthDay === 5 || monthDay === 6 || monthDay === 7 || monthDay === 8 || monthDay === 9) ? `0${monthDay}` : monthDay;
   
    return {
      default: dd + '-' + mes + '-' + year,
      short: monthName.slice(0, 3) + ' ' + monthDay,
      day: weekDayName,
      hour: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute),
      amd: year + '-'+ mes + '-' + dd,
      year: year,
      completo: dd + '-' + mes + '-' + year + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute),
    };
  };
  
  /**
   * Método que nos añade un objeto con datos de la solicitud es decir un registro al array.
   */
  addArray() {
    const fIni = this.shadowRoot.querySelector('#fechaIni');
    const fFin = this.shadowRoot.querySelector('#fechaFin');
    const alerta = this.shadowRoot.querySelector('#alerta');
    alerta.style.display = 'block';
   ((fIni.value ===  nothing) || (fFin.value ===  nothing)) ? alerta.innerHTML = '' : alerta.innerHTML = 'Seleccione la fecha de inicio y final !';
    const dateHasValue = fIni !== null && fIni.value !== '' && fFin !== null && fFin.value !== '';
    if(dateHasValue) {
    const n = this.compruebaRangos(formatearDate(fIni.value).default);
    if(!n){
      const item = {
          fsolicitud: formatearDate(new Date()).completo,
          inicio: formatearDate(fIni.value).default,
          final: formatearDate(fFin.value).default,
          estado: 'Pendiente de aprobación',
          festado: formatearDate(new Date()).completo,
        };
      this.listaDatos = [...[item], ...this.listaDatos];
      fIni.value =  null;
      fFin.value =  null;
      alerta.innerHTML = '';
      alerta.style.display='none';
      }
    }
  };
  
  /** 
   * Método que nos ayuda a comprobar fecha fin y fecha inicio para no duplicar las solicitudes. 
   */
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

  /**
   * Método ayudante que devuelve true o false al compprobar un campo en este caso campo estado. 
   */
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
        alerta.innerHTML = 'No puedes borrar vacacione aprobadas !!!';
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

  /**
   * Método que ordena un campo en que lo recibe con el id, sobrescribendo el array original.
   */
  ordenar(e) {
    const id = e.currentTarget.id;
    const array = this.listaDatos;
    array.sort(function (a, b) {
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
        <div class="alert alert-danger" role="alert" id="alerta"></div>
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

/**
 * Declaracion y envio del componente con la clase asociada. 
 */
window.customElements.define('solicitud-vacaciones', SolicitudVacaciones);
