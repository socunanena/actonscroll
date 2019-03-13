import offset from '../../src/conditions/offset';

const scrollOffset = { x: 0, y: 100 };
const actonscroll = {
  _container: document,
  _scrollOffset: scrollOffset,
};

describe('offset', () => {
  it('should be a function', () => {
    expect(offset).toBeInstanceOf(Function);
  });

  beforeEach(() => {
    window.scrollX = scrollOffset.x;
    window.scrollY = scrollOffset.y;
  });

  describe('when the current scroll position is greater than the configured offset', () => {
    it('should return true', () => {
      expect(offset.call(actonscroll, 50)).toBeTruthy();
    });
  });

  describe('when the current scroll position is greater than the configured offset', () => {
    it('should return false', () => {
      expect(offset.call(actonscroll, 200)).toBeFalsy();
    });
  });
});
