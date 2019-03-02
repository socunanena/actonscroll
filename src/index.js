import throttle from 'lodash.throttle';

function noActionWarning() {
  console.warn('[Scroll Listener] No action implemented on user scroll');
}

/**
 * Executes a predefined action when the scroll event is triggered.
 */
class ScrollListener {
  constructor() {
    this._init();
  }

  _init() {
    this
      .container(document)
      .action(noActionWarning)
      .throttling(200)
      .once(false);

    this._conditions = [];
    this._scrollOffset = document.body.scrollTop;
  }

  /**
   * Sets the container element within which the scroll will be listened.
   *
   * @example
   * scrollListener.container(document.querySelector('.my-container'));
   *
   * @param {Element} container
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
    ['up', 'down'].includes(direction) && this._conditions.push(() => this._direction(direction));
    offset > 0 && this._conditions.push(() => this._offset(offset));
    custom && this._conditions.push(custom);

    return this;
  }

  _direction(direction) {
    const directions = { 'up': 1, 'down': -1 };

    const currentScrollOffset = (this._container.body || this._container).scrollTop;
    const offsetDiff = currentScrollOffset - this._scrollOffset;
    this._scrollOffset = currentScrollOffset;

    return offsetDiff / directions[direction] > 0;
  }

  _offset(offset) {
    const currentScrollOffset = (this._container.body || this._container).scrollTop;

    return offset < currentScrollOffset;
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
    return this._conditions.reduce((success, condition) => success && condition(), true);
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
  create: () => new ScrollListener(),
};
