import direction from '../../src/conditions/direction';

describe('offset', () => {
  window.scrollY = 100;

  it('should be a function', () => {
    expect(direction).toBeInstanceOf(Function);
  });

  describe('when the direction of the scroll is the same than the configured one (up)', () => {
    it('should return true', () => {
      const scrollListener = {
        _container: document,
        _scrollOffset: 50,
      };
      const boundDirection = direction.bind(scrollListener);

      expect(boundDirection('up')).toBeTruthy();
    });
  });

  describe('when the direction of the scroll is NOT the same than the configured one (up)', () => {
    it('should return false', () => {
      const scrollListener = {
        _container: document,
        _scrollOffset: 200,
      };
      const boundDirection = direction.bind(scrollListener);

      expect(boundDirection('up')).toBeFalsy();
    });
  });
});
