import { expect, fixture, html } from '@open-wc/testing';
import { dataDetail } from '../utils/constants';
import '../components/vacation-detail/vacation-detail-admin';

describe('vacation detail validation', () => {
  let el;
  before(async () => {
    const component = html`<vacation-detail-admin .listaDatos="${dataDetail}"></vacation-detail-admin>`;
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
