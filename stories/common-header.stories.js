import { storiesOf } from '@open-wc/demoing-storybook';
import { html } from 'lit-html';
import '../src/components/common-header';

storiesOf('Components', module)
  .add('Common header', () => html`
    <common-header></common-header>
  `);
