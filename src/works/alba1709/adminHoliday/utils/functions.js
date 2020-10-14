export const getActualDate = (date_) => {
  const date = new Date(date_);

  let day = date.getDate();
  let month = date.getMonth();
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
    default: day + '-' + month + '-' + year,
    hour: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
  };
};

export const employeeRequest = [
  { name: 'Bob Marley',
    dRequest: new Date('2020-11-16'),
    dStart: new Date('2020-12-01'),
    dEnd: new Date('2020-12-15'),
    status: 'Pendiente de aprobación',
    dStatus: new Date('2020-11-16')
  },
  {
    name: 'Emma Watson',
    dRequest: new Date('2020-09-17'),
    dStart: new Date('2020-10-10'),
    dEnd: new Date('2020-10-17'),
    status: 'Pendiente de aprobación',
    dStatus: new Date('2020-09-17')
  },
  {
    name: 'Paula Pérez',
    dRequest: new Date('2020-04-07'),
    dStart: new Date('2020-07-09'),
    dEnd: new Date('2020-08-12'),
    status: 'Pendiente de aprobación',
    dStatus: new Date('2020-04-07')
  },
  {
    name: 'Ana García',
    dRequest: new Date('2020-05-19'),
    dStart: new Date('2020-08-02'),
    dEnd: new Date('2020-08-22'),
    status: 'Pendiente de aprobación',
    dStatus: new Date('2020-05-19')
  },
  {
    name: 'Robyn Rihanna Fenty',
    dRequest: new Date('2020-10-14'),
    dStart: new Date('2020-11-21'),
    dEnd: new Date('2020-11-30'),
    status: 'Pendiente de aprobación',
    dStatus: new Date('2020-10-14')
  },
  {
    name: 'Javier López',
    dRequest: new Date('2020-08-20'),
    dStart: new Date('2020-09-26'),
    dEnd: new Date('2020-10-08'),
    status: 'Pendiente de aprobación',
    dStatus: new Date('2020-08-20')
  },
  {
    name: 'Will Smith',
    dRequest: new Date('2020-09-12'),
    dStart: new Date('2020-11-18'),
    dEnd: new Date('2020-12-24'),
    status: 'Pendiente de aprobación',
    dStatus: new Date('2020-09-12')
  },
  {
    name: 'Mary Wollstonecraft',
    dRequest: new Date('2020-08-08'),
    dStart: new Date('2020-10-02'),
    dEnd: new Date('2020-10-15'),
    status: 'Pendiente de aprobación',
    dStatus: new Date('2020-08-08')
  },
  {
    name: 'Michelle Obama',
    dRequest: new Date('2020-08-17'),
    dStart: new Date('2021-01-15'),
    dEnd: new Date('2021-02-14'),
    status: 'Pendiente de aprobación',
    dStatus: new Date('2020-08-17')
  },
  {
    name: 'Mahatma Gandhi',
    dRequest: new Date('2020-10-05'),
    dStart: new Date('2020-12-15'),
    dEnd: new Date('2021-01-05'),
    status: 'Pendiente de aprobación',
    dStatus: new Date('2020-10-05')
  }
];
