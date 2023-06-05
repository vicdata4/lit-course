import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/components/list-component.js';

const data = [
  { message: 'message 1', date: new Date(), marca: 'volvo', color: '#ffffff' },
  { message: 'message 2', date: new Date(), marca: 'volvo', color: '#ffffff' },
  { message: 'message 3', date: new Date(), marca: 'volvo', color: '#ffffff' },
  { message: 'message 4', date: new Date(), marca: 'volvo', color: '#ffffff' },
  { message: 'message 5', date: new Date(), marca: 'volvo', color: '#ffffff' },
  { message: 'message 6', date: new Date(), marca: 'volvo', color: '#ffffff' }
];

describe('Empty list', () => {
  let el;

  before(async() => {
    el = await fixture(html`<list-component></list-component>`);
    await el.updateComplete;
  });

  it('Empty list is rendered correctly', async() => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Default array length', async() => {
    const list = el.shadowRoot.querySelectorAll('li');
    expect(list.length).equal(0);
  });
});

describe('List with data', () => {
  let el;

  before(async() => {
    const component = html`
      <list-component .list="${data}"></list-component>
    `;

    el = await fixture(component);
    await el.updateComplete;
  });

  it('List is rendered correctly', async() => {
    expect(el.shadowRoot).not.to.be.null;
  });

  it('Default array length', async() => {
    const list = el.shadowRoot.querySelectorAll('li');
    expect(list.length).equal(6);
  });

  it('Dispatch "delete" event after delete a message', async() => {
    const eventSpy = sinon.spy(el, 'dispatchEvent');

    const deleteButtton = el.shadowRoot.querySelectorAll('button')[0];
    deleteButtton.click();

    expect(eventSpy).calledOnce;
    expect(eventSpy.args[0][0].type).to.equal('delete-event');
  });
});
