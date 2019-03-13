import throttle from 'lodash.throttle';
import actonscroll from '../src/index';

describe('actonscroll', () => {
  it('should be an object with attributes: create', () => {
    expect(actonscroll).toBeInstanceOf(Object);
    expect(actonscroll.create).toBeInstanceOf(Function);
  });

  describe('actonscroll.create()', () => {
    const scrollEvent = new Event('scroll');
    const initialScrollPosition = 10;
    const action = jest.fn();
    let eventListener;

    it('should be an instance of ScrollListener', () => {
      const scrollListener = actonscroll.create();

      expect(scrollListener.container).toBeInstanceOf(Function);
      expect(scrollListener.action).toBeInstanceOf(Function);
      expect(scrollListener.conditions).toBeInstanceOf(Function);
      expect(scrollListener.throttling).toBeInstanceOf(Function);
      expect(scrollListener.once).toBeInstanceOf(Function);
      expect(scrollListener.start).toBeInstanceOf(Function);
      expect(scrollListener.stop).toBeInstanceOf(Function);
    });

    beforeEach(() => {
      document.body.scrollTop = initialScrollPosition;
      eventListener = actonscroll.create().throttling(0);
    });

    afterEach(() => {
      try {
        eventListener.stop();
      } catch (e) {}

      action.mockClear();
    });

    describe('actonscroll.create().start()', () => {
      describe('when there is no configured action', () => {
        it('should console.warn about it', () => {
          const consoleWarn = jest.spyOn(console, 'warn');
          eventListener.start();

          document.dispatchEvent(scrollEvent);

          expect(consoleWarn)
            .toHaveBeenCalledWith('[Scroll Listener] No action implemented on user scroll');
        });
      });

      describe('when unexpected container configured', () => {
        it('should fail adding the scroll event listener to it', (done) => {
          const fail = 'start() should throw a TypeError when called on a bad container';

          try {
            eventListener
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
            eventListener
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
              eventListener
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
              eventListener
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
            eventListener
              .conditions({ offset: -1 })
              .action(action)
              .start();

            document.dispatchEvent(scrollEvent);

            expect(action).toHaveBeenCalledWith({});
          });
        });

        describe('and the scroll position is greater than the configured value', () => {
          it('should call the action with the success result as an argument', () => {
            const offset = 20;

            eventListener
              .conditions({ offset })
              .action(action)
              .start();

            document.body.scrollTop = offset + 1;
            document.dispatchEvent(scrollEvent);

            expect(action).toHaveBeenCalledWith({ offset: true });
          });
        });

        describe('and the scroll position is less than the configured value', () => {
          it('should NOT trigger the configured action', () => {
            const offset = 20;

            eventListener
              .conditions({ offset })
              .action(action)
              .start();

            document.body.scrollTop = offset - 1;
            document.dispatchEvent(scrollEvent);

            expect(action).not.toHaveBeenCalled();
          });
        });
      });

      describe('when custom condition is configured', () => {
        describe('and it succeeds', () => {
          it('should call the action with the success result as an argument', () => {
            eventListener
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
            eventListener
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

          eventListener
            .throttling(throttling)
            .start();

          expect(throttle).toHaveBeenCalledWith(expect.anything(), throttling);
        });
      });

      describe('when once is false', () => {
        it('should trigger the action as many times as scroll is dispatched', () => {
          const length = 3;

          eventListener
            .action(action)
            .once(false)
            .start();

          Array.from({ length }, () => document.dispatchEvent(scrollEvent));

          expect(action.mock.calls.length).toBe(length);
        });
      });

      describe('when once is true', () => {
        it('should trigger the action just once', () => {
          eventListener
            .action(action)
            .once()
            .start();

          Array.from({ length: 3 }, () => document.dispatchEvent(scrollEvent));

          expect(action.mock.calls.length).toBe(1);
        });
      });
    });

    describe('actonscroll.create().stop()', () => {
      it('should stop listening to the scroll event', () => {
        eventListener
          .action(action)
          .start();
        eventListener
          .stop();

        document.dispatchEvent(scrollEvent);

        expect(action).not.toHaveBeenCalled();
      });
    });
  });
});
