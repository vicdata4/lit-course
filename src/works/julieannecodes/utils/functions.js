import { numericMonths, numericDays } from './constants';
/**
  * FORMATTERS
  */
export const dateFormatter = (date_) => {
  const date = new Date(date_);

  const monthDay = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const monthNumber = numericMonths[date.getMonth()];
  const formattedDay = numericDays[date.getDate() - 1];
  const wholeHour = hour + ':' + minute + 'h,  ';

  return {
    tableDate: monthDay >= 10 ? monthDay + '-' + monthNumber + '-' + year : formattedDay + '-' + monthNumber + '-' + year,
    solicitudDate: monthDay >= 10 ? wholeHour + monthDay + '-' + monthNumber + '-' + year : wholeHour + formattedDay + '-' + monthNumber + '-' + year,
    inputDate: monthDay >= 10 ? year + '-' + monthNumber + '-' + monthDay : year + '-' + monthNumber + '-' + formattedDay,
    slashDate: monthDay >= 10 ? monthDay + '/' + monthNumber + '/' + year : formattedDay + '/' + monthNumber + '/' + year
  };
};
export const dateInputReverse = (value) => {
  const aux = ((value.split('-')).reverse()).join('-');

  return aux;
};

export const orderItems = (arr, order) => {
  arr.sort((a, b) => a[order] - b[order]);
  return arr;
};

export const vacationDays = (arr) => {
  const nDays = arr.map(day => (day.endDate - day.startDate) / (3600 * 24 * 1000));
  const isWeekend = date => date.getDay() === 6 || date.getDay() === 0;
  let count = 0;
  let fechas= [];
  nDays.forEach(range => {
    for (let i = 0; i <= range; i++) {
      const _date = new Date(arr.startDate);
      _date.setDate(_date.getDate() + i);

      if (!isWeekend(_date)) {
        fechas = newArray(nDays.length)fechas.push(count++);
      }
    }
  });
  console.log(fechas);
  return fechas;
};
