import { fixture, html } from '@open-wc/testing';
import '../components/form-petition.js';

describe('Empty list petition: ', () => {
  let el;

  before(async () => {
    el = await fixture(html`<form-petition></form-petition>`);
    await el.updateComplete;
  });
});
