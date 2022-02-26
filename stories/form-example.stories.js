import { storiesOf } from '@open-wc/demoing-storybook';
import { html } from 'lit-html';
import '../src/components/form-validation';

storiesOf('Components', module)
  .add('Form example', () => html`
    <style>
      .light-box {
        background-color: white;
      }

      .brown-box {
        background-color: #bb8b62;
      }

      form-validation {
        display: block;
        margin-bottom: 20px;
      }
    </style>
   
    <form-validation></form-validation>
    <form-validation .validated="${true}"></form-validation>

    <div class="light-box">
      <form-validation .message="${'Test message'}"></form-validation>
    </div>
  `);
