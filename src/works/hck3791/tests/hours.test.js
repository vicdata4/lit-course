import { expect, fixture, html } from '@open-wc/testing';
import '../components/hours-component';

describe('Hours test', () => {
  let el;

  before(async () => {
    const component = html`<hours-component></hours-component>`;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('Works!', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });
});
