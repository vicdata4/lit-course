import { numericMonths } from './constants';
export const dateFormatter = (date_) => {
  const date = new Date(date_);

  const monthDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const monthNumber = numericMonths[date.getMonth()];
  const wholeHour = hour + ':' + minute + 'h, ';

  return {
    tableDate: monthDay + '-' + monthNumber + '-' + year,
    requestDate: wholeHour + monthDay + '-' + monthNumber + '-' + year,
    inputDate: year + '-' + monthNumber + '-' + monthDay,
    slashDate: monthDay + '/' + monthNumber + '/' + year,
  };
};

export const vacationDays = (interval) => {
  const nDays = (interval.endDate - interval.startDate) / (3600 * 24 * 1000);
  const isWeekend = (date) => date.getDay() === 6 || date.getDay() === 0;
  let count = 0;
  for (let i = 0; i <= nDays; i++) {
    const _date = new Date(interval.startDate);
    _date.setDate(_date.getDate() + i);
    if (!isWeekend(_date)) {
      count++;
    }
  }
  return count;
};
