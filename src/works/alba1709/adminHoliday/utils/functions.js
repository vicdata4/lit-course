export const getFormatterDate = (date_) => {
  const date = new Date(date_);

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
    defaultDate: day + '-' + month + '-' + year,
    hour: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
  };
};
