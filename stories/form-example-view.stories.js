import { storiesOf } from '@open-wc/demoing-storybook';
import { html } from 'lit-html';
import '../src/views/form-validation-view';

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
    <form-validation-view></form-validation-view>
  `);
