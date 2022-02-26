import { expect, fixture, html } from '@open-wc/testing';
import '../my-user-page.js';

describe('User page', () => {
  let el;

  before(async () => {
    const component = html`<my-user-page></my-user-page>`;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('User page is rendered correctly', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Show pagination component', async () => {
    const paginationButton = el.shadowRoot.querySelectorAll('.common-btn')[1];
    paginationButton.click();
    await el.updateComplete;
    const paginationComponent = el.shadowRoot.querySelector('list-component');
    expect(paginationComponent).not.to.be.null;
  });
});
