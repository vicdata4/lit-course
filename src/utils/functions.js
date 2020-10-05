import { months, days, numericMonths } from './constants';

/**
  * FORMATTERS
  */
// added custom format(tableDate) for vacation tables
export const dateFormatter = (date_) => {
  const date = new Date(date_);

  const monthDay = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();
  const weekDayName = days[date.getDay()];
  const hour = date.getHours();
  const minute = date.getMinutes();
  const monthNumber = numericMonths[date.getMonth()];

  return {
    default: monthName + ' ' + monthDay + ', ' + year,
    short: monthName.slice(0, 3) + ' ' + monthDay,
    day: weekDayName,
    hour: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute),
    tableDate: monthDay + '-' + monthNumber + '-' + year,
    solicitudDate: hour + ':' + minute + 'h,  ' + monthDay + '-' + monthNumber + '-' + year,
    inputDate: year + '-' + monthNumber + '-' + monthDay
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

export const emailValidator = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
