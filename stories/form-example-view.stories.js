import { storiesOf } from '@open-wc/demoing-storybook';
import { html } from 'lit-html';
import '../src/views/form-example-view';

storiesOf('Views', module)
  .add('Form example', () => html`
    <style>
        * {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            font-family: 'Muli', sans-serif;
        }
    </style>
    <form-example-view></form-example-view>
  `);
