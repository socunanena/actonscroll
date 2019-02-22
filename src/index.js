import throttle from 'lodash/throttle';

function noActionWarning() {
  console.warn('[Scroll Event] No action implemented on user scroll');
}

class ScrollEvent {
  constructor() {
    this._init();
  }

  _init() {
    this
      .container(window)
      .action(noActionWarning)
      .condition(() => true)
      .throttling(200)
      .once(false);
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

  once(once = true) {
    this._once = once;

    return this;
  }

  listen() {
    const executeAction = () => {
      const success = this._condition();
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

export default new ScrollEvent();
