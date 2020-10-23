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
