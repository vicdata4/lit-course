
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
    if ((start.getTime() > actualDate.getTime())) {
      // Comprobamos que la fecha de inicio sea menor que la de final
      if ((start.getTime() < end.getTime())) {
        return true;
      }
    }
  }
};

/**
  * @desc Retorna un string con la fecha en formado dd/mm/yyyy
  * @param Object Date
  * @param Boolean si true retorna minutos ademas del dia
  * @return String
  */
export const formatDate = (date, minutes = false) => {
  if (minutes) {
    return `
      ${date.getDate()}/${(date.getMonth() + 1)}/${date.getUTCFullYear()} - ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
  } else {
    return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getUTCFullYear()}`;
  }
};

export const maxDate = () => {
  const date = new Date();
  return `${date.getUTCFullYear() + 2}-${(date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
};
export const minDate = () => {
  const date = new Date();
  return `${date.getUTCFullYear()}-${(date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
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
