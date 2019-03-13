import offset from '../../src/conditions/offset';
import getScrollPosition from '../../src/helpers/getScrollPosition';

jest.mock('../../src/helpers/getScrollPosition');

describe('offset', () => {
  it('should be a function', () => {
    expect(offset).toBeInstanceOf(Function);
  });

  beforeEach(() => {
    getScrollPosition.mockReturnValue({ x: 0, y: 100 });
  });

  describe('when the current scroll position is greater than the configured offset', () => {
    it('should return true', () => {
      expect(offset.call({}, 50)).toBeTruthy();
    });
  });

  describe('when the current scroll position is greater than the configured offset', () => {
    it('should return false', () => {
      expect(offset.call({}, 200)).toBeFalsy();
    });
  });
});
