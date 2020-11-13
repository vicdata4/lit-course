import { expect, fixture, html } from '@open-wc/testing';
import '../user-page.js';

describe('User page', () => {
  let el;

  before(async () => {
    const component = html`<user-page></user-page>`;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('User page is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });
});
