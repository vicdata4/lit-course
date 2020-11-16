import { expect, fixture, html } from '@open-wc/testing';
// import sinon from 'sinon/pkg/sinon-esm.js';
import '../solicitudVacaciones/requests-holidays-view';
import { dateToday } from '../solicitudVacaciones/utils/functions';

describe('Form functions', () => {
  let el;

  before(async () => {
    const component = html`<requests-holidays-view></requests-holidays-view>`;
    el = await fixture(component);
    await el.updateComplete;
  });

  it('Enter an invalid date', async () => {
    const result = await el.addSolicitud({
      detail: { fHoy: dateToday(new Date()).dToday, infoFI: '2020-11-03', infoFF: '2020-10-20' },
    });
    expect(result).equal(false);
  });

  it('Enter a valid date', async () => {
    const result = await el.addSolicitud({
      detail: { fHoy: dateToday(new Date()).dToday, infoFI: '2020-12-03', infoFF: '2020-12-06' },
    });
    expect(result).equal(true);
  });

  it('Any values', async () => {
    const result = await el.addSolicitud({
      detail: { fHoy: dateToday(new Date()).dToday, infoFI: '', infoFF: '' },
    });
    expect(result).equal(false);
  });
});
