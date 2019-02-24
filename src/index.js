import throttle from 'lodash/throttle';

function noActionWarning() {
  console.warn('[Scroll Listener] No action implemented on user scroll');
}

function getVerticalOffset(container) {
  const content = container === document ? document.body : container.firstElementChild;

  return content.getBoundingClientRect().top;
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
      .condition(() => true)
      .direction('both')
      .throttling(200)
      .once(false);

    this._scrollOffset = getVerticalOffset(this._container);
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
   * Sets a condition to determine whether the configured action has to be performed or not.
   *
   * @example
   * scrollListener.condition(() => document.querySelector('.my-container').scrollTop > 800);
   *
   * @param {Function} condition
   * @returns {ScrollListener}
   */
  condition(condition) {
    this._condition = condition;

    return this;
  }

  /**
   * Sets the direction of the scroll to listen to.
   *
   * @example
   * scrollListener.direction('up');
   *
   * @param {string} direction ['up', 'down', 'both']
   * @returns {ScrollListener}
   */
  direction(direction) {
    const directions = {
      'up': [1],
      'down': [-1],
      'both': [1, -1],
    };

    this._direction = directions[direction] || directions['both'];

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
      if (this._isDirectionAllowed()) {
        const success = this._condition();
        if (success) {
          this._action(success);

          if (this._once) {
            this._stop();
          }
        }
      }
    };

    this._throttledExecution = throttle(executeAction, this._throttling);

    this._start();
  }

  _isDirectionAllowed() {
    const currentScrollOffset = getVerticalOffset(this._container);
    const offsetDiff = currentScrollOffset - this._scrollOffset;
    this._scrollOffset = currentScrollOffset;

    return this._direction.some(direction => offsetDiff / direction > 0);
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
