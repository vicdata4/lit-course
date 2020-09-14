import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/common-header.js';

describe('Form validation', () => {
  let el;

  before(async() => {
    const component = html`
      <common-header></common-header>
    `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Form is rendered correctly', async() => {
    expect(el.shadowRoot).not.to.be.null;
  });
});
