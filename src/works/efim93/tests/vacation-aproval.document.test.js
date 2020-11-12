import { expect, fixture, html } from '@open-wc/testing';
import '../components/vacation-approval/vacation-approval';

describe('vacation approval validation', () => {
  let el;
  before(async () => {
    const component = html`<vacation-approval></vacation-approval>`;
    el = await fixture(component);
    await el.updateComplete;
  });

  it('Vacation approval is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('constant read correctly', async () => {
    expect(el.listaDatos.length).not.to.be.equal(null);
  });
});

describe('Show part of array fnc & click on index buttons', async () => {
  let el;
  before(async () => {
    const component = html`<vacation-approval></vacation-approval>`;
    el = await fixture(component);
    await el.updateComplete;
  });

  it('When index equals 0', async () => {
    el.showPage(0);
    await el.updateComplete;
    expect(el.stepper.length).equal(2);
    expect(el.index).equal(0);
    expect(el.from).equal(0);
    expect(el.to).equal(10);
  });

  it('When index equals 2', async () => {
    el.showPage(1);
    await el.updateComplete;
    expect(el.index).equal(1);
    expect(el.from).equal(10);
    expect(el.to).equal(20);
  });

  it('When click on button with index 1', async () => {
    const indStep = el.shadowRoot.querySelector('#_1');
    indStep.click();
    await el.updateComplete;
    expect(el.index).equal(1);
    expect(el.from).equal(10);
    expect(el.to).equal(20);
  });
  it('Dispatch "change" event after change option', async () => {
    const original = [...el.listaDatos];
    const select = el.shadowRoot.querySelectorAll('select')[0];
    select.value = 2;
    const e = new Event('change');
    select.dispatchEvent(e);
    const newarray = el.listaDatos;
    expect(newarray[0].estado).to.equal(2);
    expect(original[0].fecha_estado).to.not.equal(newarray[0].fecha_estado);
  });
});

describe('On clck on the buttons show part of array', async () => {
  let el, leftButton, rightButton;
  before(async () => {
    const component = html`<vacation-approval></vacation-approval>`;
    el = await fixture(component);
    await el.updateComplete;

    leftButton = el.shadowRoot.querySelector('#stepLeft');
    rightButton = el.shadowRoot.querySelector('#stepRight');
  });

  it('Show prev step if index distinct of 0', async () => {
    el.index = 1;
    leftButton.click();

    await el.updateComplete;
    expect(el.index).equal(0);
  });

  it('Nothing, if index equals 0', async () => {
    leftButton.click();
    await el.updateComplete;
    expect(el.index).equal(0);
  });

  it('Show next step, if index < stepper length', async () => {
    rightButton.click();
    await el.updateComplete;
    expect(el.index).equal(1);
  });

  it('Nothing if index equals stepper length -1', async () => {
    el.index = 2;
    rightButton.click();

    await el.updateComplete;
    expect(el.index).equal(2);
  });
});
