import { storiesOf } from '@open-wc/demoing-storybook';
import { html } from 'lit-html';
import '../src/components/list-component';

const data = [
    { message: 'message 1', date: new Date() },
    { message: 'message 2', date: new Date() },
    { message: 'message 3', date: new Date() },
    { message: 'message 4', date: new Date() },
    { message: 'message 5', date: new Date() },
    { message: 'message 6', date: new Date() }
  ];

storiesOf('Components', module)
  .add('List component', () => html`
    <list-component .list="${data}"></list-component>
  `);
