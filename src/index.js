import throttle from 'lodash.throttle';
import getScrollPosition from './helpers/getScrollPosition';
import verifyDirection from './conditions/direction';
import verifyOffset from './conditions/offset';

function noActionWarning() {
  console.warn('[Scroll Listener] No action implemented on user scroll');
}

/**
 * Executes a predefined action when the scroll event is triggered.
 */
class ScrollListener {
  /**
   * @param {Object} [options]
   * @param {Document|Element} [options.container]
   * @param {Function} [options.action]
   * @param {Object} [options.conditions]
   * @param {number} [options.throttling]
   * @param {boolean} [options.once]
   */
  constructor(options) {
    this._verifyDirection = verifyDirection.bind(this);
    this._verifyOffset = verifyOffset.bind(this);

    this._init(options);
  }

  _init({
    container = document,
    action = noActionWarning,
    conditions = {},
    throttling = 200,
    once = false,
  } = {}) {
    this._conditions = {};

    this
      .container(container)
      .action(action)
      .conditions(conditions)
      .throttling(throttling)
      .once(once);

    this._scrollOffset = getScrollPosition(container);
  }

  /**
   * Sets the container element within which the scroll will be listened.
   *
   * @example
   * scrollListener.container(document.querySelector('.my-container'));
   *
   * @param {Document|Element} container
   * @returns {ScrollListener}
   */
  container(container) {
    this._container = container;

    return this;
  }

  /**
   * Sets an action to be performed when the scroll event is triggered.
   *
   * @example
   * scrollListener.action(() => console.log('Scrooolling!'));
   *
   * @param {Function} action
   * @returns {ScrollListener}
   */
  action(action) {
    this._action = action;

    return this;
  }

  /**
   * Sets a list of conditions to determine whether the configured action has to be performed or not.
   *
   * @example
   * scrollListener.conditions({
   *   direction: 'up',
   *   offset: 200,
   *   custom: () => true,
   * });
   *
   * @param {Object} conditions
   * @param {string} conditions.direction Allowed values: <code>'up'</code>, <code>'down'</code>.
   * @param {number} conditions.offset In pixels.
   * @param {Function} conditions.custom
   * @returns {ScrollListener}
   */
  conditions({ direction, offset, custom }) {
    // Direction
    if (['up', 'down'].includes(direction)) {
      this._conditions.direction = () => this._verifyDirection(direction);
    }

    // Offset
    if (offset > 0) {
      this._conditions.offset = () => this._verifyOffset(offset);
    }

    // Custom
    if (custom) {
      this._conditions.custom = custom;
    }

    return this;
  }

  /**
   * Sets a throttling time (ms) to the scroll event.
   *
   * @example
   * scrollListener.throttling(1000);
   *
   * @param {number} throttling
   * @returns {ScrollListener}
   */
  throttling(throttling) {
    this._throttling = throttling;

    return this;
  }

  /**
   * Determines whether the action should be performed once or not.
   *
   * @example
   * scrollListener.once();
   *
   * @param {boolean} [once]
   * @returns {ScrollListener}
   */
  once(once = true) {
    this._once = once;

    return this;
  }

  /**
   * Executes the configured action after checking that all the conditions are satisfied.
   *
   * @example
   * scrollListener.listen();
   */
  listen() {
    const executeAction = () => {
      const success = this._checkConditions();
      if (success) {
        this._action(success);

        if (this._once) {
          this._stop();
        }
      }
    };

    this._throttledExecution = throttle(executeAction, this._throttling);

    this._start();
  }

  _checkConditions() {
    let checkedConditions = {};

    return Object.entries(this._conditions).every(([type, condition]) => {
      checkedConditions[type] = condition();
      return checkedConditions[type];
    }) && checkedConditions;
  }

  /**
   * Removes the listener from the configured container.
   *
   * @example
   * scrollListener.revoke();
   */
  revoke() {
    this._stop();
  }

  _start() {
    this._container.addEventListener('scroll', this._throttledExecution);
  }

  _stop() {
    this._container.removeEventListener('scroll', this._throttledExecution);
  }
}

export default {
  create: (options) => new ScrollListener(options),
};
