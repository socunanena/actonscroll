import verifyDirections from '../../src/conditions/directions';

const scrollOffset = { x: 100, y: 100 };
const actonscroll = {
  _container: document,
  _scrollOffset: scrollOffset,
};

describe('verifyDirections', () => {
  it('should be a function', () => {
    expect(verifyDirections).toBeInstanceOf(Function);
  });

  describe('when a configured direction is wrong', () => {
    it('should throw an error', () => {

    });
  });

  beforeEach(() => {
    window.scrollX = scrollOffset.x;
    window.scrollY = scrollOffset.y;
  });

  describe('when the configured direction is "all"', () => {
    describe('and the scroll direction is "up"', () => {
      it('should return "up"', () => {
        window.scrollY += 1;

        expect(verifyDirections.call(actonscroll, ['all'])).toBe('up');
      });
    });

    describe('and the scroll direction is "down"', () => {
      it('should return "down"', () => {
        window.scrollY -= 1;

        expect(verifyDirections.call(actonscroll, ['all'])).toBe('down');
      });
    });

    describe('and the scroll direction is "left"', () => {
      it('should return "left"', () => {
        window.scrollX += 1;

        expect(verifyDirections.call(actonscroll, ['all'])).toBe('left');
      });
    });

    describe('and the scroll direction is "right"', () => {
      it('should return "right"', () => {
        window.scrollX -= 1;

        expect(verifyDirections.call(actonscroll, ['all'])).toBe('right');
      });
    });
  });

  describe('when the configured direction is "vertical"', () => {
    describe('and the scroll direction is "up"', () => {
      it('should return "up"', () => {
        window.scrollY += 1;

        expect(verifyDirections.call(actonscroll, ['vertical'])).toBe('up');
      });
    });

    describe('and the scroll direction is "down"', () => {
      it('should return "down"', () => {
        window.scrollY -= 1;

        expect(verifyDirections.call(actonscroll, ['vertical'])).toBe('down');
      });
    });

    describe('and the scroll direction is "left"', () => {
      it('should return false', () => {
        window.scrollX += 1;

        expect(verifyDirections.call(actonscroll, ['vertical'])).toBeFalsy();
      });
    });

    describe('and the scroll direction is "right"', () => {
      it('should return false', () => {
        window.scrollX -= 1;

        expect(verifyDirections.call(actonscroll, ['vertical'])).toBeFalsy();
      });
    });
  });

  describe('when the configured direction is "horizontal"', () => {
    describe('and the scroll direction is "up"', () => {
      it('should return false', () => {
        window.scrollY += 1;

        expect(verifyDirections.call(actonscroll, ['horizontal'])).toBeFalsy();
      });
    });

    describe('and the scroll direction is "down"', () => {
      it('should return false', () => {
        window.scrollY -= 1;

        expect(verifyDirections.call(actonscroll, ['horizontal'])).toBeFalsy();
      });
    });

    describe('and the scroll direction is "left"', () => {
      it('should return "left"', () => {
        window.scrollX += 1;

        expect(verifyDirections.call(actonscroll, ['horizontal'])).toBe('left');
      });
    });

    describe('and the scroll direction is "right"', () => {
      it('should return "right"', () => {
        window.scrollX -= 1;

        expect(verifyDirections.call(actonscroll, ['horizontal'])).toBe('right');
      });
    });
  });

  describe('when the configured direction is "up"', () => {
    describe('and the scroll direction is "up"', () => {
      it('should return "up"', () => {
        window.scrollY += 1;

        expect(verifyDirections.call(actonscroll, ['up'])).toBe('up');
      });
    });

    describe('and the scroll direction is "down"', () => {
      it('should return false', () => {
        window.scrollY -= 1;

        expect(verifyDirections.call(actonscroll, ['up'])).toBeFalsy();
      });
    });

    describe('and the scroll direction is "left"', () => {
      it('should return false', () => {
        window.scrollX += 1;

        expect(verifyDirections.call(actonscroll, ['up'])).toBeFalsy();
      });
    });

    describe('and the scroll direction is "right"', () => {
      it('should return false', () => {
        window.scrollX -= 1;

        expect(verifyDirections.call(actonscroll, ['up'])).toBeFalsy();
      });
    });
  });

  describe('when the configured direction is "down"', () => {
    describe('and the scroll direction is "up"', () => {
      it('should return false', () => {
        window.scrollY += 1;

        expect(verifyDirections.call(actonscroll, ['down'])).toBeFalsy();
      });
    });

    describe('and the scroll direction is "down"', () => {
      it('should return "down"', () => {
        window.scrollY -= 1;

        expect(verifyDirections.call(actonscroll, ['down'])).toBe('down');
      });
    });

    describe('and the scroll direction is "left"', () => {
      it('should return false', () => {
        window.scrollX += 1;

        expect(verifyDirections.call(actonscroll, ['down'])).toBeFalsy();
      });
    });

    describe('and the scroll direction is "right"', () => {
      it('should return false', () => {
        window.scrollX -= 1;

        expect(verifyDirections.call(actonscroll, ['down'])).toBeFalsy();
      });
    });
  });

  describe('when the configured direction is "left"', () => {
    describe('and the scroll direction is "up"', () => {
      it('should return false', () => {
        window.scrollY += 1;

        expect(verifyDirections.call(actonscroll, ['left'])).toBeFalsy();
      });
    });

    describe('and the scroll direction is "down"', () => {
      it('should return false', () => {
        window.scrollY -= 1;

        expect(verifyDirections.call(actonscroll, ['left'])).toBeFalsy();
      });
    });

    describe('and the scroll direction is "left"', () => {
      it('should return "left"', () => {
        window.scrollX += 1;

        expect(verifyDirections.call(actonscroll, ['left'])).toBe('left');
      });
    });

    describe('and the scroll direction is "right"', () => {
      it('should return false', () => {
        window.scrollX -= 1;

        expect(verifyDirections.call(actonscroll, ['left'])).toBeFalsy();
      });
    });
  });

  describe('when the configured direction is "right"', () => {
    describe('and the scroll direction is "up"', () => {
      it('should return false', () => {
        window.scrollY += 1;

        expect(verifyDirections.call(actonscroll, ['right'])).toBeFalsy();
      });
    });

    describe('and the scroll direction is "down"', () => {
      it('should return false', () => {
        window.scrollY -= 1;

        expect(verifyDirections.call(actonscroll, ['right'])).toBeFalsy();
      });
    });

    describe('and the scroll direction is "left"', () => {
      it('should return false', () => {
        window.scrollX += 1;

        expect(verifyDirections.call(actonscroll, ['right'])).toBeFalsy();
      });
    });

    describe('and the scroll direction is "right"', () => {
      it('should return "right"', () => {
        window.scrollX -= 1;

        expect(verifyDirections.call(actonscroll, ['right'])).toBe('right');
      });
    });
  });
});
