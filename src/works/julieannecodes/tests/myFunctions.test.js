import { expect } from '@open-wc/testing';
import { dateFormatter, orderItems } from '../utils/functions';
import { employeeList } from '../utils/employees';

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

describe('Order items function', async () => {
  const array = [...employeeList];
  const order = 'startDate';
  const idSortedBy = [1, 2, 7, 6, 3, 5, 4, 0, 9, 8];

  it('Returns array correctly sorted asc', async () => {
    expect(...orderItems(array, order).map((item) => item.id)).equal(...idSortedBy.map((id) => id));
  });
});
