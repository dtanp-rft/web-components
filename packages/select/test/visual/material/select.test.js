import { fixtureSync, nextFrame } from '@vaadin/testing-helpers';
import { visualDiff } from '@web/test-runner-visual-regression';
import { sendKeys } from '@web/test-runner-commands';
import '@vaadin/vaadin-list-box/theme/material/vaadin-list-box.js';
import '@vaadin/vaadin-item/theme/material/vaadin-item.js';
import '../../not-animated-styles.js';
import '../../../theme/material/vaadin-select.js';

describe('select', () => {
  let div, element;

  beforeEach(async () => {
    div = document.createElement('div');
    div.style.display = 'inline-block';
    div.style.padding = '10px';
    element = fixtureSync('<vaadin-select></vaadin-select>', div);
    element.renderer = (root) => {
      root.innerHTML = `
        <vaadin-list-box>
          <vaadin-item>item 1</vaadin-item>
          <vaadin-item>item 2</vaadin-item>
          <vaadin-item>item 3</vaadin-item>
        </vaadin-list-box>
      `;
    };
    await nextFrame();
  });

  it('basic', async () => {
    await visualDiff(div, 'basic');
  });

  it('focus-ring', async () => {
    await sendKeys({ press: 'Tab' });

    await visualDiff(div, 'focus-ring');
  });

  it('disabled', async () => {
    element.disabled = true;
    await visualDiff(div, 'disabled');
  });

  it('readonly', async () => {
    element.readonly = true;
    await visualDiff(div, 'readonly');
  });

  it('label', async () => {
    element.label = 'Label';
    await visualDiff(div, 'label');
  });

  it('placeholder', async () => {
    element.placeholder = 'Placeholder';
    await visualDiff(div, 'placeholder');
  });

  it('value', async () => {
    element.value = 'item 1';
    await visualDiff(div, 'value');
  });

  it('required', async () => {
    element.label = 'Label';
    element.required = true;
    await visualDiff(div, 'required');
  });

  it('invalid', async () => {
    element.invalid = true;
    await visualDiff(div, 'invalid');
  });

  it('error message', async () => {
    element.label = 'Label';
    element.errorMessage = 'This field is required';
    element.required = true;
    element.validate();
    await visualDiff(div, 'error-message');
  });

  it('helper text', async () => {
    element.helperText = 'Helper text';
    await visualDiff(div, 'helper-text');
  });

  it('prefix slot', async () => {
    const span = document.createElement('span');
    span.setAttribute('slot', 'prefix');
    span.textContent = '$';
    element.appendChild(span);
    await visualDiff(div, 'prefix');
  });

  it('opened', async () => {
    div.style.height = '200px';
    div.style.width = '200px';
    await sendKeys({ press: 'Tab' });
    element.opened = true;
    await nextFrame();
    await visualDiff(div, 'opened');
  });

  it('width', async () => {
    element.style.width = '80px';
    await visualDiff(div, 'width');
  });

  it('width with value', async () => {
    element.style.width = '80px';
    element.value = 'item 1';
    await visualDiff(div, 'width-value');
  });
});