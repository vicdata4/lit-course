import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/form-validation.js';

describe('Form validation', () => {
  let el, email, password, submit;

  before(async() => {
    const component = html`
      <form-validation></form-validation>
    `;

    el = await fixture(component);
    await el.updateComplete;

    email = el.shadowRoot.querySelector('#email');
    password = el.shadowRoot.querySelector('#password');
    submit = el.shadowRoot.querySelector('input[type=submit]');
  });

  it('Form is rendered correctly', async() => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Default properties', async() => {
    expect(el.validated).equal(false);
    expect(el.message).equal('');
  });

  it('Successfull icon is not visible', async() => {
    const thumbIcon = el.shadowRoot.querySelector('.alert-succesfull');
    const message = el.shadowRoot.querySelector('.alert-msg');

    expect(message).to.be.null;
    expect(thumbIcon).to.be.null;
  });

  it('Enter an invalid email', async() => {
    password.value = '12345678';
    email.value = 'test@test.';

    submit.click();
    await el.updateComplete;

    const thumbIcon = el.shadowRoot.querySelector('.alert-succesfull');
    const message = el.shadowRoot.querySelector('.alert-msg');

    expect(el.validated).equal(false);
    expect(message).not.to.be.null;
    expect(thumbIcon).to.be.null;
  });

  it('Enter an invalid password', async() => {
    password.value = '1234';
    email.value = 'test@test.com';

    submit.click();
    await el.updateComplete;

    const thumbIcon = el.shadowRoot.querySelector('.alert-succesfull');
    const message = el.shadowRoot.querySelector('.alert-msg');
    const errorClass = el.shadowRoot.querySelector(".borde-rojo");
    const validClass = el.shadowRoot.querySelector(".borde-verde");

    expect(el.validated).equal(false);
    expect(message).not.to.be.null;
    expect(thumbIcon).to.be.null;
    expect(errorClass).not.to.be.null;
    expect(validClass).to.be.null;
  });

  it('Enter valid values', async() => {
    password.value = '12345678';
    email.value = 'test@test.com';

    submit.click();
    await el.updateComplete;

    const thumbIcon = el.shadowRoot.querySelector('.alert-succesfull');
    const message = el.shadowRoot.querySelector('.alert-msg');

    expect(el.validated).equal(true);
    expect(message).to.be.null;
    expect(thumbIcon).not.to.be.null;
  });
});
