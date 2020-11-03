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
