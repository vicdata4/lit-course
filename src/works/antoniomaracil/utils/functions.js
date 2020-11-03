/**
 * @desc Retorna un objeto Date de un input
 * @param string formato de input date dd-mm-yyyy
 * @param Boolean true = cambiar sentido fecha yyyy-mm-dd
 * @return object Date
 */
export const getDate = (date, reverse = false) => {
  const b = date.split(/\D/);
  if (reverse === false) {
    return new Date(b[0], --b[1], b[2]);
  } else {
    return new Date(b[2], --b[1], b[0]);
  }
};

export const checkDate = (start, end) => {
  const actualDate = new Date();
  const dateHasValue = start !== null && start !== '' && end !== null && end !== '';
  if (dateHasValue) {
    // Comprobamos que la fecha elegida sea mayor que la actual
    if (start.getTime() > actualDate.getTime()) {
      // Comprobamos que la fecha de inicio sea menor que la de final
      if (start.getTime() < end.getTime()) {
        return true;
      }
    }
  }
};

export const orderedList = (list, column) => {
  return list.sort((a, b) => {
    if (a[column] > b[column]) {
      return 1;
    } else if (a[column] < b[column]) {
      return -1;
    }
    return 0;
  });
};

export const dateFormatter = (date_) => {
  const date = new Date(date_);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return {
    default: (day < 10 ? '0' + day : day) + '/' + (month < 10 ? '0' + month : month) + '/' + year,
    hour: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute),
  };
};
