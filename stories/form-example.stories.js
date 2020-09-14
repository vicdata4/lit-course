import { storiesOf } from '@open-wc/demoing-storybook';
import { html } from 'lit-html';
import '../src/components/form-example';

storiesOf('Components', module)
  .add('Form example', () => html`
    <style>
      .light-box {
        background-color: white;
      }

      .brown-box {
        background-color: #bb8b62;
      }

      form-example {
        display: block;
        margin-bottom: 20px;
      }
    </style>

    <div class="brown-box">
      <form-example></form-example>
    </div>
    <div class="light-box">
      <form-example></form-example>
    </div>

    <div class="light-box">
      <form-example message="Test message"></form-example>
    </div>

    <div class="light-box">
      <form-example .validated="${true}"></form-example>
    </div>
  `);
