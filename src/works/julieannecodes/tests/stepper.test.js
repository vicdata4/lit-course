import { expect, fixture, html } from '@open-wc/testing';
import '../VacationRequests/stepper.js';
const component = html`<stepper-component .listLength="${9}"></stepper-component>`;

describe('Show part of array fnc & click on index buttons', async () => {
  let el, buttonSteps;
  before(async () => {
    el = await fixture(component);
    await el.updateComplete;

    buttonSteps = el.shadowRoot.querySelectorAll('.bSteps');
  });

  it('When index equals 0', async () => {
    el.showPartOf(0);

    await el.updateComplete;
    expect(el.steps.length).equal(3);
    expect(el.index).equal(0);
    expect(el.from).equal(0);
    expect(el.to).equal(4);
  });

  it('When index equals 2', async () => {
    el.showPartOf(2);

    await el.updateComplete;

    expect(el.index).equal(2);
    expect(el.from).equal(8);
    expect(el.to).equal(12);
  });

  it('When click on button with index 1', async () => {
    buttonSteps[1].click();

    await el.updateComplete;

    expect(el.index).equal(1);
    expect(el.from).equal(4);
    expect(el.to).equal(8);
  });
});

describe('Show part of array (click on arrow buttons)', async () => {
  let el, leftButton, rightButton;
  before(async () => {
    el = await fixture(component);
    await el.updateComplete;

    leftButton = el.shadowRoot.querySelector('#leftB');
    rightButton = el.shadowRoot.querySelector('#rightB');
  });

  it('Show prev step (0) if index > 0', async () => {
    el.index = 1;
    leftButton.click();

    await el.updateComplete;
    expect(el.index).equal(0);
  });

  it('Nothing if index equals 0', async () => {
    leftButton.click();
    await el.updateComplete;
    expect(el.index).equal(0);
  });

  it('Show next step if index < steps length', async () => {
    rightButton.click();
    await el.updateComplete;
    expect(el.index).equal(1);
  });

  it('Nothing if index equals steps length -1', async () => {
    el.index = 2;
    rightButton.click();

    await el.updateComplete;
    expect(el.index).equal(2);
  });
});
