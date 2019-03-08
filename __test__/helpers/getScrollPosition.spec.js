import getScrollPosition from '../../src/helpers/getScrollPosition';

describe('offset', () => {
  it('should be a function', () => {
    expect(getScrollPosition).toBeInstanceOf(Function);
  });

  describe('when the container is an Element', () => {
    it('should return the scrollTop value', () => {
      const scrollTop = 100;
      const container = document.createElement('div');
      container.scrollTop = scrollTop;

      expect(getScrollPosition(container)).toBe(scrollTop);
    });
  });

  describe('when the container is the document object', () => {
    describe('and the window.scrollY is defined', () => {
      it('should return it', () => {
        const scrollTop = 100;
        window.scrollY = scrollTop;

        expect(getScrollPosition(document)).toBe(scrollTop);
      });
    });

    describe('and the window.pageYOffset is defined', () => {
      it('should return it', () => {
        const scrollTop = 100;
        window.scrollY = undefined;
        window.pageYOffset = scrollTop;

        expect(getScrollPosition(document)).toBe(scrollTop);
      });
    });

    describe('and the document.body.scrollTop & document.documentElement.scrollTop are defined', () => {
      it('should return its sum', () => {
        const scrollTop = 100;
        window.scrollY = undefined;
        window.pageYOffset = undefined;
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;

        expect(getScrollPosition(document)).toBe(scrollTop + scrollTop);
      });
    });

    describe('and the document.documentElement.scrollTop is defined but document.documentElement.scrollTop not', () => {
      it('should return just the document.documentElement.scrollTop value', () => {
        const scrollTop = 100;
        window.scrollY = undefined;
        window.pageYOffset = undefined;
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = undefined;

        expect(getScrollPosition(document)).toBe(scrollTop);
      });
    });
  });
});
