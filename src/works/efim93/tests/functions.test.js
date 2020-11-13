import { expect } from '@open-wc/testing';
import { formatDate } from '../utils/functions';
describe('Date functions', () => {
  const date = new Date();
  date.setFullYear(2020, 11, 11);
  date.setHours(22);
  date.setMinutes(0);

  it('Return default format correctly', async () => {
    expect(formatDate(date).default).equal('11-11-2020');
  });

  it('Get a correct format hour hh:mm', async () => {
    expect(formatDate(date).hour).equal('22:00');
  });

  it('Get a correct date with yyyy/mm/dd format', async () => {
    expect(formatDate(date).amd).equal('2020-11-11');
  });

  it('Get a correct year', async () => {
    expect(formatDate(date).year).equal(2020);
  });

  it('Return format completo correctly', async () => {
    expect(formatDate(date).completo).equal('11-11-2020 22:00');
  });
  it('Get a correct minute', async () => {
    date.setMinutes(0);
    let minute = date.getMinutes();
    expect(minute).equal(0);
    date.setMinutes(30);
    minute = date.getMinutes();
    expect(minute).equal(30);
    date.setMinutes(59);
    minute = date.getMinutes();
    expect(minute).equal(59);
  });
});
