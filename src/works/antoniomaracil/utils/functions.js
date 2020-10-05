
/**
  * @desc Retorna un objeto Date de un input
  * @param string formato de input date dd-mm-yyyy
  * @param Boolean cambiar sentido fecha true = yyyy-mm-dd
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

/**
  * @desc Retorna un string con la fecha en formado dd/mm/yyyy
  * @param Object Date
  * @return String
  */
export const formatDate = (date, minutes = false) => {
  if (minutes) {
    return `
      ${date.getDate()}/${(date.getMonth() + 1)}/${date.getUTCFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
  } else {
    return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getUTCFullYear()}`;
  }
};

export const minMaxDate = (date, max = false) => {
  if (max) {
    return `${date.getUTCFullYear() + 2}-${(date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
  } else {
    return `${date.getUTCFullYear()}-${(date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
  }
};
