import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../VacationRequests/holidays-form.js';

describe('Form functions', () => {
  let element, startDate, endDate, submit;

  before(async () => {
    const component = html`<holidays-form></holidays-form>`;
    element = await fixture(component);
    await element.updateComplete;

    startDate = element.shadowRoot.querySelector('#start');
    endDate = element.shadowRoot.querySelector('#end');
    submit = element.shadowRoot.querySelector('button[type=submit]');
  });

  it('Form is rendered correctly', async () => {
    expect(element.shadowRoot).not.to.be.null;
  });

  it('Default properties', async () => {
    expect(element.message).equal('');
    expect(element.id).equal(0);
  });

  it('Enter invalid dates', async () => {
    startDate.value = '2020-10-27';
    endDate.value = '2020-10-24';

    submit.click();
    await element.updateComplete;

    const message = element.shadowRoot.querySelector('.alert-msg');

    expect(message).not.to.be.null;
    expect(element.validated).equal(false);
  });

  it('Enter valid dates', async () => {
    startDate.value = '2020-11-01';
    endDate.value = '2020-11-10';

    submit.click();
    await element.updateComplete;

    const message = element.shadowRoot.querySelector('.alert-msg');

    expect(message).to.be.null;
    expect(element.validated).equal(true);
  });

  it('Dispatch "send-dates" event after correct validation', async () => {
    const event = sinon.spy(element, 'dispatchEvent');
    startDate.value = '2020-11-01';
    endDate.value = '2020-11-10';

    submit.click();
    await element.updateComplete;

    if (element.validated) {
      expect(event).calledOnce;
      expect(event.args[0][0].type).to.equal('send-dates');
    }
  });
});
