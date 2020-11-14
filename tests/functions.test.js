import { expect } from '@open-wc/testing';
import { dateFormatter, emailValidator, scrollMode } from '../src/utils/functions';

describe('Date formatter', () => {
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

  it('Returns a correct format when hour value is less than 10', async() => {
    const date_ = date;
    date_.setFullYear(2020, 4, 3);
    expect(dateFormatter(date).hour).equal('07:00');
  });

  it('Returns false when pass an invalid email', async() => {
    expect(emailValidator('test@test.')).equal(false);
  });

  it('Returns false when pass an empty value', async() => {
    expect(emailValidator('')).equal(false);
  });

  it('Returns true when pass a valid email', async() => {
    expect(emailValidator('test@test.es')).equal(true);
  });
});

describe('Scroll mode', () => {
  it('Returns true when pass a valid email', async() => {
    scrollMode('fixed', '0px');
    expect(document.body.style.position).equal('fixed');
    expect(document.body.style.top).equal('0px');
  });
});