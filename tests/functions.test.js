import { expect } from '@open-wc/testing';
import { dateFormatter } from '../src/utils/functions';

describe('Form validation', () => {
  const date = new Date();
  date.setFullYear(2020, 11, 3);
  date.setHours(7);
  date.setMinutes(0);

  it('Returns hour format correctly', async() => {
    expect(dateFormatter(date).hour).equal('07:00');
  });

  it('Returns day format correctly', async() => {
    expect(dateFormatter(date).day).equal('Friday');
  });

  it('Returns short format correctly', async() => {
    expect(dateFormatter(date).short).equal('Dec 3');
  });

  it('Returns default format correctly', async() => {
    expect(dateFormatter(date).default).equal('December 3, 2020');
  });
});
