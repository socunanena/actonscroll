import offset from '../../src/conditions/offset';

describe('offset', () => {
  window.scrollY = 100;

  it('should be a function', () => {
    expect(offset).toBeInstanceOf(Function);
  });

  describe('when the current scroll position is greater than the configured offset', () => {
    it('should return true', () => {
      const scrollListener = { _container: document };
      const boundOffset = offset.bind(scrollListener);

      expect(boundOffset(50)).toBeTruthy();
    });
  });

  describe('when the current scroll position is greater than the configured offset', () => {
    it('should return false', () => {
      const scrollListener = { _container: document };
      const boundOffset = offset.bind(scrollListener);

      expect(boundOffset(200)).toBeFalsy();
    });
  });
});
