import throttle from 'lodash.throttle';
import Actonscroll from '../src/index';

describe('actonscroll', () => {
  it('should be an instance of Actonscroll', () => {
    expect(Actonscroll).toBeInstanceOf(Object);
    expect(Actonscroll.prototype.container).toBeInstanceOf(Function);
    expect(Actonscroll.prototype.action).toBeInstanceOf(Function);
    expect(Actonscroll.prototype.conditions).toBeInstanceOf(Function);
    expect(Actonscroll.prototype.throttling).toBeInstanceOf(Function);
    expect(Actonscroll.prototype.once).toBeInstanceOf(Function);
    expect(Actonscroll.prototype.start).toBeInstanceOf(Function);
    expect(Actonscroll.prototype.stop).toBeInstanceOf(Function);
  });

  const scrollEvent = new Event('scroll');
  const initialScrollPosition = 10;
  const action = jest.fn();
  let actonscroll;

  beforeEach(() => {
    document.body.scrollTop = initialScrollPosition;
    actonscroll = new Actonscroll({ throttling: 0 });
  });

  afterEach(() => {
    try {
      actonscroll.stop();
    } catch (e) {}

    action.mockClear();
  });

  describe('Actonscroll.start()', () => {
    describe('when there is no configured action', () => {
      it('should console.warn about it', () => {
        const consoleWarn = jest.spyOn(console, 'warn');
        actonscroll.start();

        document.dispatchEvent(scrollEvent);

        expect(consoleWarn)
          .toHaveBeenCalledWith('[Actonscroll] No action implemented on user scroll');
      });
    });

    describe('when unexpected container configured', () => {
      it('should fail adding the scroll event listener to it', (done) => {
        const fail = 'start() should throw a TypeError when called on a bad container';

        try {
          actonscroll
            .container('bad container')
            .start();
          done.fail(fail);
        } catch (error) {
          if (
            error.name === 'TypeError'
            && [
              'this._container.addEventListener is not a function',
              'this._container.removeEventListener is not a function'
            ].includes(error.message)
          ) {
            done();
          } else {
            done.fail(fail);
          }
        }
      });
    });

    describe('when direction condition is configured', () => {
      describe('and bad direction is passed', () => {
        it('should not check for the direction condition', () => {
          actonscroll
            .conditions({ directions: ['bad-direction'] })
            .action(action)
            .start();

          document.dispatchEvent(scrollEvent);

          expect(action).toHaveBeenCalledWith({});
        });
      });

      describe('and direction condition is configured to "up"', () => {
        describe('and the user scrolls up', () => {
          it('should call the action with the success result as an argument', () => {
            actonscroll
              .conditions({ directions: ['up'] })
              .action(action)
              .start();

            document.body.scrollTop = initialScrollPosition + 1;
            document.dispatchEvent(scrollEvent);

            expect(action).toHaveBeenCalledWith({ directions: 'up' });
          });
        });

        describe('and the user scrolls down', () => {
          it('should NOT trigger the configured action', () => {
            actonscroll
              .conditions({ directions: ['up'] })
              .action(action)
              .start();

            document.body.scrollTop = initialScrollPosition - 1;
            document.dispatchEvent(scrollEvent);

            expect(action).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('when offset condition is configured', () => {
      describe('and bad offset is passed', () => {
        it('should not check for the offset condition', () => {
          actonscroll
            .conditions({ offset: { x: -1 } })
            .action(action)
            .start();

          document.dispatchEvent(scrollEvent);

          expect(action).toHaveBeenCalledWith({});
        });
      });

      describe('and the scroll position is greater than the configured value', () => {
        it('should call the action with the success result as an argument', () => {
          const offset = { y: 20 };

          actonscroll
            .conditions({ offset })
            .action(action)
            .start();

          document.body.scrollTop = offset.y + 1;
          document.dispatchEvent(scrollEvent);

          expect(action).toHaveBeenCalledWith({ offset: { x: 0, y: 21 } });
        });
      });

      describe('and the scroll position is less than the configured value', () => {
        it('should NOT trigger the configured action', () => {
          const offset = { y: 20 };

          actonscroll
            .conditions({ offset })
            .action(action)
            .start();

          document.body.scrollTop = offset.y - 1;
          document.dispatchEvent(scrollEvent);

          expect(action).not.toHaveBeenCalled();
        });
      });
    });

    describe('when custom condition is configured', () => {
      describe('and it succeeds', () => {
        it('should call the action with the success result as an argument', () => {
          actonscroll
            .conditions({ custom: () => 'success' })
            .action(action)
            .start();

          document.dispatchEvent(scrollEvent);

          expect(action).toHaveBeenCalledWith({ custom: 'success' });
        });
      });

      describe('and it does NOT succeed', () => {
        it('should NOT trigger the configured action', () => {
          const customCondition = jest.fn(() => false);
          actonscroll
            .conditions({ custom: customCondition })
            .action(action)
            .start();

          document.dispatchEvent(scrollEvent);

          expect(action).not.toHaveBeenCalled();
        });
      });
    });

    describe('when throttling is set', () => {
      it('should call lodash function: throttle', () => {
        const throttling = 200;

        actonscroll
          .throttling(throttling)
          .start();

        expect(throttle).toHaveBeenCalledWith(expect.anything(), throttling);
      });
    });

    describe('when once is false', () => {
      it('should trigger the action as many times as scroll is dispatched', () => {
        const length = 3;

        actonscroll
          .action(action)
          .once(false)
          .start();

        Array.from({ length }, () => document.dispatchEvent(scrollEvent));

        expect(action.mock.calls.length).toBe(length);
      });
    });

    describe('when once is true', () => {
      it('should trigger the action just once', () => {
        actonscroll
          .action(action)
          .once()
          .start();

        Array.from({ length: 3 }, () => document.dispatchEvent(scrollEvent));

        expect(action.mock.calls.length).toBe(1);
      });
    });
  });

  describe('Actonscroll.stop()', () => {
    it('should stop listening to the scroll event', () => {
      actonscroll
        .action(action)
        .start();
      actonscroll
        .stop();

      document.dispatchEvent(scrollEvent);

      expect(action).not.toHaveBeenCalled();
    });
  });
});
