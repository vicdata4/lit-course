
export const formatDate = (date_) => {
  const date = new Date(date_);
  const monthDay = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const f = (date.getMonth() + 1);
  const mes = ([10, 11, 12].includes(f)) ? f : `0${f}`;
  const dd = ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(monthDay)) ? `0${monthDay}` : monthDay;
  return {
    default: dd + '-' + mes + '-' + year,
    hour: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute),
    amd: year + '-' + mes + '-' + dd,
    year: year,
    completo: dd + '-' + mes + '-' + year + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
  };
};