/**
 * @desc Retorna un objeto Date de un input
 * @param string formato de input date dd-mm-yyyy
 * @param Boolean cambiar sentido fecha true = yyyy-mm-dd
 * @return object Date
 */
export const getDate = (date, reverse = false) => {
  const fecha = date.split(/\D/);
  if (reverse === false) {
    return new Date(fecha[0], --fecha[1], fecha[2]);
  } else {
    return new Date(fecha[2], --fecha[1], fecha[0]);
  }
};

export const dateToday = (d) => {
  const date = new Date(d);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }
  const hour = date.getHours();
  const minute = date.getMinutes();

  return {
    dToday: year + '-' + month + '-' + day,
    dTomorrow: year + '-' + month + '-' + (day + 1),
    defaultDate: day + '-' + month + '-' + year,
    hour: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute),
  };
};
