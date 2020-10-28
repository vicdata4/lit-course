import { expect } from '@open-wc/testing';
import { checkDate, dateFormatter, getDate } from '../utils/functions';

describe('Date functions', () => {
  const date = new Date();
  date.setFullYear(2020, 11, 3);
  date.setHours(7);
  date.setMinutes(0);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(tomorrow.getDate() + 7);

  const firstDate = '10/05/2020';
  const secondDate = '2020/05/10';

  it('Returns hour format correctly', async () => {
    expect(dateFormatter(date).default + ' ' + dateFormatter(date).hour).equal('03/12/2020 07:00');
  });

  it('Returns day format correctly', async () => {
    expect(dateFormatter(date).default).equal('03/12/2020');
  });

  it('Pass the check with a correct date', async () => {
    expect(checkDate(tomorrow, nextWeek)).equal(true);
  });

  it('Get a correct date with dd/mm/yyyy format', async () => {
    expect(getDate(firstDate, true).getTime).equal(new Date(2020, 4, 10).getTime);
  });
  it('Get a correct date with yyyy/mm/dd format', async () => {
    expect(getDate(secondDate).getTime).equal(new Date(2020, 4, 10).getTime);
  });
});
