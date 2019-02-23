import throttle from 'lodash/throttle';

function noActionWarning() {
  console.warn('[Scroll Event] No action implemented on user scroll');
}

function getVerticalOffset(container) {
  const content = container === document ? document.body : container.firstElementChild;

  return content.getBoundingClientRect().top;
}

class ScrollEvent {
  constructor() {
    this._init();
  }

  _init() {
    this
      .container(document)
      .action(noActionWarning)
      .condition(() => true)
      .throttling(200)
      .direction('both')
      .once(false);

    this._scrollOffset = getVerticalOffset(this._container);
  }

  container(container) {
    this._container = container;

    return this;
  }

  action(action) {
    this._action = action;

    return this;
  }

  condition(condition) {
    this._condition = condition;

    return this;
  }

  throttling(throttling) {
    this._throttling = throttling;

    return this;
  }

  direction(direction) {
    const directions = {
      'up': [1],
      'down': [-1],
      'both': [1, -1],
    };

    this._direction = directions[direction];

    return this;
  }

  once(once = true) {
    this._once = once;

    return this;
  }

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
  create: () => new ScrollEvent(),
};
