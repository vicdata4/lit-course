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
  const f = (date.getMonth() + 1);
  const mes = (f === 10 || f === 11 || f === 12) ? f : `0${f}`;
  const dd = (monthDay === 1 || monthDay === 2 || monthDay === 3 || monthDay === 4 || monthDay === 5 || monthDay === 6 || monthDay === 7 || monthDay === 8 || monthDay === 9) ? `0${monthDay}` : monthDay;
  return {
    default: dd + '-' + mes + '-' + year,
    short: monthName.slice(0, 3) + ' ' + monthDay,
    day: weekDayName,
    hour: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute),
    amd: year + '-' + mes + '-' + dd,
    year: year,
    completo: dd + '-' + mes + '-' + year + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
  };
};
