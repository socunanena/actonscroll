import throttle from 'lodash.throttle';
import getScrollPosition from './helpers/getScrollPosition';
import directionsConversion from './config/directions';
import verifyDirections from './conditions/directions';
import verifyOffset from './conditions/offset';

function noActionWarning() {
  console.warn('[Actonscroll] No action implemented on user scroll');
}

/**
 * Executes a predefined action when the scroll event is triggered.
 */
export default class Actonscroll {
  /**
   * @param {Object} [options]
   * @param {Document|Element} [options.container]
   * @param {Function} [options.action]
   * @param {Object} [options.conditions]
   * @param {number} [options.throttling]
   * @param {boolean} [options.once]
   */
  constructor(options) {
    this._verifyDirections = verifyDirections.bind(this);
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
  }

  /**
   * Sets the container element within which the scroll will be listened.
   *
   * @example
   * actonscroll.container(document.querySelector('.my-container'));
   *
   * @param {Document|Element} container
   * @returns {Actonscroll}
   */
  container(container) {
    this._container = container;
    this._scrollOffset = getScrollPosition(container);

    return this;
  }

  /**
   * Sets an action to be performed when the scroll event is triggered.
   *
   * @example
   * actonscroll.action(() => console.log('Scrooolling!'));
   *
   * @param {Function} action
   * @returns {Actonscroll}
   */
  action(action) {
    this._action = action;

    return this;
  }

  /**
   * Sets a list of conditions to determine whether the configured action has to be performed or not.
   *
   * @example
   * actonscroll.conditions({
   *   directions: ['up', 'left'],
   *   offset: 200,
   *   custom: () => true,
   * });
   *
   * @param {Object} conditions
   * @param {string[]} conditions.directions Allowed values: <code>'all'</code>, <code>'vertical'</code>, <code>'horizontal'</code>, <code>'up'</code>, <code>'down'</code>, <code>'left'</code>, <code>'right'</code>.
   * @param {number} conditions.offset In pixels.
   * @param {Function} conditions.custom
   * @returns {Actonscroll}
   */
  conditions({ directions, offset, custom }) {
    // Directions
    if (directions && directions.every(direction => directionsConversion[direction])) {
      this._conditions.directions = () => this._verifyDirections(directions);
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
   * actonscroll.throttling(1000);
   *
   * @param {number} throttling
   * @returns {Actonscroll}
   */
  throttling(throttling) {
    this._throttling = throttling;

    return this;
  }

  /**
   * Determines whether the action should be performed once or not.
   *
   * @example
   * actonscroll.once();
   *
   * @param {boolean} [once]
   * @returns {Actonscroll}
   */
  once(once = true) {
    this._once = once;

    return this;
  }

  /**
   * Executes the configured action after checking that all the conditions are satisfied.
   *
   * @example
   * actonscroll.start();
   */
  start() {
    const runAction = () => {
      const success = this._checkConditions();
      if (success) {
        this._action(success);

        if (this._once) {
          this._stop();
        }
      }
    };

    this._stop();

    this._throttledAction = throttle(runAction, this._throttling);

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
   * actonscroll.stop();
   */
  stop() {
    this._stop();
  }

  _start() {
    this._container.addEventListener('scroll', this._throttledAction);
  }

  _stop() {
    this._container.removeEventListener('scroll', this._throttledAction);
  }
}
