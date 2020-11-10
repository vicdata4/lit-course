export const dateToday = (d) => {
  const date = new Date(d);

  let day = date.getDate();
  let dayTomorrow = date.getDate() + 1;
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  if (day < 10) {
    day = '0' + day;
  }
  if (dayTomorrow < 10) {
    dayTomorrow = '0' + dayTomorrow;
  }
  if (month < 10) {
    month = '0' + month;
  }
  const hour = date.getHours();
  const minute = date.getMinutes();

  return {
    dToday: year + '-' + month + '-' + day,
    dTomorrow: year + '-' + month + '-' + dayTomorrow,
    defaultDate: day + '-' + month + '-' + year,
    hour: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute),
  };
};

export const orderList = (list, column) => {
  return list.sort((a, b) => {
    if (a[column] > b[column]) {
      return 1;
    } else if (a[column] < b[column]) {
      return -1;
    }
    return 0;
  });
};
