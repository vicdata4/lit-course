import { months, days } from './constants';

/**
 * FORMATTERS
 */
export const dateFormatter = (date_) => {
  const date = new Date(date_);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();
  const weekDayName = days[date.getDay()];
  const hour = date.getHours();
  const minute = date.getMinutes();

  return {
    default: day + '/' + month + '/' + year,
    dateHour:
      day +
      '/' +
      month +
      '/' +
      year +
      ' ' +
      (hour < 10 ? '0' + hour : hour) +
      ':' +
      (minute < 10 ? '0' + minute : minute),
    short: monthName + ' ' + day,
    day: weekDayName,
    hour: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute),
  };
};
