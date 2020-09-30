import { months, days } from './constants';

/**
  * FORMATTERS
  */

export const dateFormatter = (date_) => {
  const date = new Date(date_);

  const monthDay = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();
  const weekDayName = days[date.getDay()];
  const hour = date.getHours();
  const minute = date.getMinutes();

  return {
    default: monthName + ' ' + monthDay + ', ' + year,
    short: monthName.slice(0, 3) + ' ' + monthDay,
    day: weekDayName,
    hour: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
  };
};

export const emailValidator = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

function calculaFin() {
  fechaIni = this.shadowRoot.getElementById('fechaIni').value;
  const fM = new Date(this.fechaIni);
  const tiempo = fM.getTime();
  const milisegundos = 1 * 24 * 60 * 60 * 1000;
  fM.setTime(tiempo + milisegundos);
  const mm = ((fM.getMonth() + 1) === 10 || (fM.getMonth() + 1) === 11 || (fM.getMonth() + 1) === 12) ? (fM.getMonth() + 1) : `0${(fM.getMonth() + 1)}`;
  const dd = ((fM.getDate() === 1) || (fM.getDate() === 2) || (fM.getDate() === 3) || (fM.getDate() === 4) || (fM.getDate() === 5) || (fM.getDate() === 6) || (fM.getDate() === 7) || (fM.getDate() === 8) || (fM.getDate() === 9)) ? `0${fM.getDate()}` : fM.getDate();
  if (this.fechaIni !== '') {
    this.shadowRoot.getElementById('fechaFin').setAttribute('min', `${fM.getFullYear()}-${mm}-${dd}`);
    const f = new Date(this.fechaIni);
    if (((f.getMonth() + 1) === 11) || ((f.getMonth() + 1) === 12)) {
      this.shadowRoot.getElementById('fechaFin').setAttribute('max', `${(this.anio + 1)}-12-31`);
    } else {
      this.shadowRoot.getElementById('fechaFin').setAttribute('max', `${this.anio}-12-31`);
    }
  }
};

function calculaDias() {
  this.fechaIni = this.shadowRoot.getElementById('fechaIni').value;
  this.fechaFin = this.shadowRoot.getElementById('fechaFin').value;
  const f1 = new Date(this.fechaFin);
  const f2 = new Date(this.fechaIni);
  const milisegundos = f2 - f1;
  const diasF = Math.ceil(milisegundos / (24 * 60 * 60 * 1000));
  if (diasF < 0) {
    this.dias = Math.abs(diasF);
    this.shadowRoot.getElementById('dias').innerHTML = `Te vas a coger: ${this.dias} días`;
  }
};

function guardarDatos() {
  this.fechaIni = this.shadowRoot.getElementById('fechaIni').value;
  this.fechaFin = this.shadowRoot.getElementById('fechaFin').value;
  if (this.fechaIni === '') {
    alert('Has de seleccionar una fecha de Inicio');
    this.shadowRoot.getElementById('fechaIni').focus();
    return false;
  }
  if (this.fechaFin === '') {
    alert('Has de seleccionar una fecha de Final');
    this.shadowRoot.getElementById('fechaFin').focus();
    return false;
  }
  this.fecha = `${this.dia}-${this.mes}-${this.anio}`;
  this.id++;
  this.fechaIni = this.shadowRoot.getElementById('fechaIni').value;
  this.fechaFin = this.shadowRoot.getElementById('fechaFin').value;

  this.datos = {
    id: this.id,
    fsolicitud: this.fecha,
    inicio: this.fechaIni,
    final: this.fechaFin,
    estado: 'Pendiente de aprobación',
    festado: this.fecha,
    dias: this.dias,
  };
  this.arrDatos.push(this.datos);
  this.shadowRoot.getElementById('fechaIni').value = '';
  this.shadowRoot.getElementById('fechaFin').value = '';
  return true;
};
