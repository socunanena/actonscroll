import actonscroll from '../src/index';

describe('actonscroll', () => {
  it('should be an object with attributes: create', () => {
    expect(actonscroll).toBeInstanceOf(Object);
    expect(actonscroll.create).toBeInstanceOf(Function);
  });

  describe('actonscroll.create()', () => {
    document.body.innerHTML = `
<html>
  <body>
    <section>
      <article>
        <div class="container">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ullamcorper luctus lectus. Duis sit amet vestibulum augue, vel congue ligula. Cras auctor congue ex, id faucibus orci euismod sit amet. Maecenas ac urna lectus. Nulla mollis semper eros, vitae posuere dolor molestie et. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis in neque purus. Fusce id elit tempor, porttitor ligula non, ullamcorper ex. Aenean placerat sem et diam commodo pellentesque. Maecenas volutpat est ultrices ipsum vulputate, in imperdiet lorem tempor. Suspendisse consequat odio eget ex fringilla, ac sodales quam ultrices. Nunc non venenatis orci.</p>

          <p>Vivamus ut venenatis mauris. Praesent faucibus in velit vehicula aliquam. Pellentesque ut metus quis nibh congue fringilla ac et mauris. Donec porttitor fringilla ipsum sit amet efficitur. Vivamus ex ipsum, cursus sed lacus quis, vulputate ultricies enim. Etiam fermentum metus sit amet pharetra fermentum. Curabitur ornare pretium neque, nec cursus mi accumsan nec. Etiam in dui non lacus aliquam lacinia et quis erat. Fusce ultrices massa arcu, sed suscipit justo convallis nec. Phasellus facilisis porta enim feugiat tempor. Morbi eget tortor magna. Phasellus euismod euismod accumsan. Mauris magna justo, rhoncus vitae felis at, faucibus pulvinar ante. Morbi finibus nulla quis imperdiet sodales.</p>

          <p>Fusce vitae ipsum odio. Praesent suscipit, tellus quis ullamcorper dictum, lacus neque mattis tellus, non tempus lectus tortor vel purus. Donec a ex ornare diam tristique rutrum. Nulla aliquet posuere felis sed gravida. Suspendisse viverra porttitor elit nec scelerisque. Aenean rhoncus neque porta justo fringilla efficitur. Nullam sollicitudin iaculis feugiat. Curabitur eget fringilla ligula. Sed ultricies rhoncus ante. Pellentesque rhoncus mattis odio, vitae cursus odio malesuada in. Maecenas at dui arcu. Proin eu augue in dolor tristique vehicula consectetur in risus. Sed a tortor sodales orci fringilla rutrum. Quisque sed libero malesuada, efficitur sem at, tincidunt arcu. Fusce ultricies lacus eget massa porttitor volutpat.</p>
        </div>
      </article>
    </section>
  </body>
</html>
`;

    const scrollEvent = new Event('scroll');
    const action = jest.fn();
    const initialScrollPosition = 10;
    let eventListener;

    it('should be an instance of ScrollListener', () => {
      const scrollListener = actonscroll.create();

      expect(scrollListener.container).toBeInstanceOf(Function);
      expect(scrollListener.action).toBeInstanceOf(Function);
      expect(scrollListener.conditions).toBeInstanceOf(Function);
      expect(scrollListener.throttling).toBeInstanceOf(Function);
      expect(scrollListener.once).toBeInstanceOf(Function);
      expect(scrollListener.listen).toBeInstanceOf(Function);
      expect(scrollListener.revoke).toBeInstanceOf(Function);
    });

    beforeEach(() => {
      document.body.scrollTop = initialScrollPosition;
      eventListener = actonscroll.create().throttling(10);
    });

    afterEach(() => {
      try {
        eventListener.revoke();
      } catch (e) {}

      action.mockClear();
    });

    describe('actonscroll.create().listen()', () => {
      describe('when there is no configured action', () => {
        it('should console.warn about it', () => {
          const consoleWarn = jest.spyOn(console, 'warn');
          eventListener.listen();

          document.dispatchEvent(scrollEvent);

          expect(consoleWarn)
            .toHaveBeenCalledWith('[Scroll Listener] No action implemented on user scroll');
        });
      });

      describe('when unexpected container configured', () => {
        it('should fail adding the scroll event listener to it', (done) => {
          const fail = 'listen() should throw a TypeError when called on a bad container';

          try {
            eventListener
              .container('bad container')
              .listen();
            done.fail(fail);
          } catch (error) {
            if (
              error.name === 'TypeError'
              && error.message === 'this._container.addEventListener is not a function'
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

          });
        });

        describe('and direction condition is configured to "up"', () => {
          describe('and the user scrolls up', () => {
            it('should call the action with the success result as an argument', () => {
              eventListener
                .conditions({ direction: 'up' })
                .action(action)
                .listen();

              document.body.scrollTop = initialScrollPosition + 1;
              document.dispatchEvent(scrollEvent);

              expect(action).toHaveBeenCalledWith(true);
            });
          });

          describe('and the user scrolls down', () => {
            it('should NOT trigger the configured action', () => {
              eventListener
                .conditions({ direction: 'up' })
                .action(action)
                .listen();

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

          });
        });

        describe('and the scroll position is greater than the configured value', () => {
          it('should call the action with the success result as an argument', () => {
            const offset = 20;

            eventListener
              .conditions({ offset })
              .action(action)
              .listen();

            document.body.scrollTop = offset + 1;
            document.dispatchEvent(scrollEvent);

            expect(action).toHaveBeenCalledWith(true);
          });
        });

        describe('and the scroll position is less than the configured value', () => {
          it('should NOT trigger the configured action', () => {
            const offset = 20;

            eventListener
              .conditions({ offset })
              .action(action)
              .listen();

            document.body.scrollTop = offset - 1;
            document.dispatchEvent(scrollEvent);

            expect(action).not.toHaveBeenCalled();
          });
        });
      });

      describe('when custom condition is configured', () => {
        describe('and it succeeds', () => {
          it('should call the action with the success result as an argument', () => {
            const success = 'success';
            const customCondition = jest.fn(() => success);
            eventListener
              .conditions({ custom: customCondition })
              .action(action)
              .listen();

            document.dispatchEvent(scrollEvent);

            expect(action).toHaveBeenCalledWith(success);
          });
        });

        describe('and it does NOT succeed', () => {
          it('should NOT trigger the configured action', () => {
            const customCondition = jest.fn(() => false);
            eventListener
              .conditions({ custom: customCondition })
              .action(action)
              .listen();

            document.dispatchEvent(scrollEvent);

            expect(action).not.toHaveBeenCalled();
          });
        });
      });

      // import throttle from 'lodash/throttle';
      // jest.mock('lodash/throttle');


      // import HttpService from '../../services/httpService';
      // jest.mock('../../services/httpService', ()=>({
      //   post: jest.fn()
      // });

      describe('when once is false', () => {
        it('should trigger the action as many times as scroll is dispatched', () => {
          const length = 3;

          eventListener
            .action(action)
            .once(false)
            .listen();

          Promise.all(Array.from({ length }, () => new Promise((resolve) => {
            setTimeout(() => {
              document.dispatchEvent(scrollEvent);
              resolve();
            }, 50);
          }))).then(() => expect(action.mock.calls.length).toBe(length));
        });
      });

      describe('when once is true', () => {
        it('should trigger the action just once', () => {
          eventListener
            .action(action)
            .once()
            .listen();

          Promise.all(Array.from({ length: 3 }, () => new Promise((resolve) => {
            setTimeout(() => {
              document.dispatchEvent(scrollEvent);
              resolve();
            }, 50);
          }))).then(() => expect(action.mock.calls.length).toBe(1));
        });
      });
    });

    describe('actonscroll.create().revoke()', () => {
      it('should stop listening to the scroll event', () => {
        eventListener
          .action(action)
          .listen();
        eventListener
          .revoke();

        document.dispatchEvent(scrollEvent);

        expect(action).not.toHaveBeenCalled();
      });
    });
  });
});
