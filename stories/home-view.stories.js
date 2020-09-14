import { storiesOf } from '@open-wc/demoing-storybook';
import { html } from 'lit-html';
import '../src/views/home-view';

storiesOf('Views', module)
  .add('Home', () => html`
    <style>
        * {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            font-family: 'Muli', sans-serif;
        }
    </style>
    <home-view></home-view>
  `);
