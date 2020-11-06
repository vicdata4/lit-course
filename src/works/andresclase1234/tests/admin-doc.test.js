import { expect, fixture, html } from '@open-wc/testing';
import '../components/admin-docs/admin-docs';
import { documents } from '../utils/data';
import sinon from 'sinon/pkg/sinon-esm.js';

describe('Admin-doc empty render ok', () => {
  let el;

  before(async () => {
    el = await fixture(html`<admin-docs></admin-docs>`);
    await el.updateComplete;
  });
});

describe('Admin-doc view', () => {
  let el;

  before(async () => {
    el = await fixture(html`<admin-docs .list=${documents}></admin-docs>`);
    await el.updateComplete;
  });

  it('Table is rendered ok', async () => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Render table with data ok', async () => {
    const rows = el.shadowRoot.querySelectorAll('.documents');
    expect(rows.length).equal(el.list.length);
  });
  it('Delete on click ok', async () => {
    const eventSpy = sinon.spy(el, 'remove');
    const deleteButtton = el.shadowRoot.querySelectorAll('button')[0];
    deleteButtton.click();
    expect(eventSpy).calledOnce;
  });
  it('List update when delete event', async () => {
    const deleteButtton = el.shadowRoot.querySelectorAll('button')[0];
    deleteButtton.click();
    await el.updateComplete;
    const rows = el.shadowRoot.querySelectorAll('.documents');
    expect(rows.length).equal(el.list.length);
  });
  it('Download path ok', async () => {
    const downloadPath = el.shadowRoot.querySelectorAll('a')[0].href;
    const pathInProp = el.list[0].path;
    expect(downloadPath).to.contain(pathInProp);
  });
});
