import { expect } from '@open-wc/testing';
import { dateFormatter, vacationDays } from '../utils/functions';
import { vacationDates } from '../utils/vacation-dates';

describe('Formatted dates', async () => {
  const date = new Date();
  date.setFullYear(2020, 11, 20);
  date.setHours(5);
  date.setMinutes(4);

  it('Returns date format for table display correctly', async () => {
    expect(dateFormatter(date).tableDate).equal('20-12-2020');
  });

  it('Returns date format for min value input', async () => {
    expect(dateFormatter(date).inputDate).equal('2020-12-20');
  });

  it('Returns request date correctly', async () => {
    expect(dateFormatter(date).requestDate).equal('05:04h, 20-12-2020');
  });
});

describe('VacationDays function', async () => {
  it('Returns vacation days without weekend days', async () => {
    expect(vacationDays(vacationDates[2])).equal(5);
  });

  it('Returns vacation days in weekdays', async () => {
    expect(vacationDays(vacationDates[0])).equal(5);
  });
});
