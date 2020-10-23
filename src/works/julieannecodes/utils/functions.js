import { numericMonths } from './constants';
export const dateFormatter = (date_) => {
  const date = new Date(date_);

  const monthDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const monthNumber = numericMonths[date.getMonth()];
  const wholeHour = hour + ':' + minute + 'h,  ';

  return {
    tableDate: monthDay + '-' + monthNumber + '-' + year,
    solicitudDate: wholeHour + monthDay + '-' + monthNumber + '-' + year,
    inputDate: year + '-' + monthNumber + '-' + monthDay,
  };
};
export const dateInputReverse = (value) => {
  const aux = value.split('-').reverse().join('-');

  return aux;
};

export const orderItems = (arr, order) => {
  arr.sort((a, b) => a[order] - b[order]);
  return arr;
};
