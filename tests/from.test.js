import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/form-example.js';

describe('Form validation', () => {
  let el, email, password, submit;

  before(async() => {
    const component = html`
      <form-example></form-example>
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

  it('Successfull icon is not visible', async() => {
    const successfullIcon = el.shadowRoot.querySelector('.alert-succesfull');
    expect(successfullIcon).to.be.null;
  });

  it('Enter an invalid email', async() => {
    password.value = '12345678';
    email.value = 'test@test.';

    submit.click();

    await el.updateComplete;

    const successfullIcon = el.shadowRoot.querySelector('.alert-succesfull');
    expect(successfullIcon).to.be.null;
  });

  it('Enter an invalid password', async() => {
    password.value = '1234';
    email.value = 'test@test.com';

    submit.click();
    await el.updateComplete;

    const icon = el.shadowRoot.querySelector('.alert-succesfull');
    expect(icon).to.be.null;
  });

  it('Enter valid values', async() => {
    password.value = '12345678';
    email.value = 'test@test.com';

    submit.click();
    await el.updateComplete;

    const icon = el.shadowRoot.querySelector('.alert-succesfull');
    expect(icon).not.to.be.null;
  });
});
