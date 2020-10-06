import { numericMonths } from './constants';

/**
  * FORMATTERS
  */
// added custom format(tableDate) for vacation tables
export const dateFormatter = (date_) => {
  const date = new Date(date_);

  const monthDay = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const monthNumber = numericMonths[date.getMonth()];

  return {
    tableDate: monthDay + '-' + monthNumber + '-' + year,
    solicitudDate: hour + ':' + minute + 'h,  ' + monthDay + '-' + monthNumber + '-' + year,
    inputDate: year + '-' + monthNumber + '-' + monthDay,
    sCurrentDate: monthDay + '/' + monthNumber + '/' + year
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
