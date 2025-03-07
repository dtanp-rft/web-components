/**
 * @license
 * Copyright (c) 2021 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { DisabledMixin } from '@vaadin/component-base/src/disabled-mixin.js';
import { DelegateStateMixin } from './delegate-state-mixin.js';
import { InputMixin } from './input-mixin.js';

const CheckedMixinImplementation = (superclass) =>
  class CheckedMixinClass extends DelegateStateMixin(DisabledMixin(InputMixin(superclass))) {
    static get properties() {
      return {
        /**
         * True if the element is checked.
         * @type {boolean}
         */
        checked: {
          type: Boolean,
          value: false,
          notify: true,
          reflectToAttribute: true
        }
      };
    }

    static get delegateProps() {
      return [...super.delegateProps, 'checked'];
    }

    /**
     * @protected
     * @override
     */
    _onChange(event) {
      this._toggleChecked(event.target.checked);
    }

    /** @protected */
    _toggleChecked(checked) {
      this.checked = checked;
    }
  };

/**
 * A mixin to manage the checked state.
 */
export const CheckedMixin = dedupingMixin(CheckedMixinImplementation);
