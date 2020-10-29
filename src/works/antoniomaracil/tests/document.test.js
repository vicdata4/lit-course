import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../components/document-list/components/document-list';
import { empDocument } from '../utils/constants';

describe('Document list test: \n', () => {
  describe('Empty document list', () => {
    let el;

    before(async () => {
      el = await fixture(html`<document-list></document-list>`);
      await el.updateComplete;
    });

    it('Empty table is rendered correctly', async () => {
      expect(el.shadowRoot).not.to.be.null;
    });

    it('Render only table header', async () => {
      const cells = el.shadowRoot.querySelectorAll('.group');
      expect(cells.length).equal(0);
    });
  });
  describe('Document list with data', () => {
    let el;

    before(async () => {
      el = await fixture(html`<document-list .list=${empDocument}></document-list>`);
      await el.updateComplete;
    });

    it('Table is rendered correctly', async () => {
      expect(el.shadowRoot).not.to.be.null;
    });

    it('Render table with header and all files', async () => {
      const rows = el.shadowRoot.querySelectorAll('.group');
      expect(rows.length).equal(el.list.length);
    });
    it('Remove file event click working', async () => {
      const eventSpy = sinon.spy(el, 'removeDocument');
      const deleteButtton = el.shadowRoot.querySelectorAll('button')[0];
      deleteButtton.click();
      expect(eventSpy).calledOnce;
    });
    it('Update rows when a document is deleted', async () => {
      const deleteButtton = el.shadowRoot.querySelectorAll('button')[0];
      deleteButtton.click();
      await el.updateComplete;
      const rows = el.shadowRoot.querySelectorAll('.group');
      expect(rows.length).equal(el.list.length);
    });
  });
});
