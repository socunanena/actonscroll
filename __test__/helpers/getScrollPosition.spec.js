import getScrollPosition from '../../src/helpers/getScrollPosition';

describe('offset', () => {
  it('should be a function', () => {
    expect(getScrollPosition).toBeInstanceOf(Function);
  });

  const scrollLeft = 100;
  const scrollTop = 100;

  describe('when the container is an Element', () => {
    it('should return the scrollLeft/scrollTop values', () => {
      const container = document.createElement('div');
      container.scrollLeft = scrollLeft;
      container.scrollTop = scrollTop;

      expect(getScrollPosition(container)).toEqual({ x: scrollLeft, y: scrollTop });
    });
  });

  describe('when the container is the document object', () => {
    describe('and the window.scrollX/window.scrollY are defined', () => {
      it('should return it', () => {
        window.scrollX = scrollLeft;
        window.scrollY = scrollTop;

        expect(getScrollPosition(document)).toEqual({ x: scrollLeft, y: scrollTop });
      });
    });

    describe('and the window.pageXOffset/window.pageYOffset are defined', () => {
      it('should return it', () => {
        window.scrollX = undefined;
        window.scrollY = undefined;
        window.pageXOffset = scrollLeft;
        window.pageYOffset = scrollTop;

        expect(getScrollPosition(document)).toEqual({ x: scrollLeft, y: scrollTop });
      });
    });

    describe('and the document.body.scrollLeft/document.body.scrollTop & document.documentElement.scrollLeft/ocument.documentElement.scrollTop are defined', () => {
      it('should return its sum', () => {
        window.scrollX = undefined;
        window.scrollY = undefined;
        window.pageXOffset = undefined;
        window.pageYOffset = undefined;
        document.body.scrollLeft = scrollLeft;
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollLeft = scrollLeft;
        document.documentElement.scrollTop = scrollTop;

        expect(getScrollPosition(document)).toEqual({ x: 2 * scrollLeft, y: 2 * scrollTop });
      });
    });

    describe('and the document.body.scrollLeft/document.body.scrollTop are defined but document.documentElement.scrollLeft/ocument.documentElement.scrollTop not', () => {
      it('should return just the document.body.scrollLeft/document.documentElement.scrollTop values', () => {
        window.scrollX = undefined;
        window.scrollY = undefined;
        window.pageXOffset = undefined;
        window.pageYOffset = undefined;
        document.body.scrollLeft = scrollLeft;
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollLeft = undefined;
        document.documentElement.scrollTop = undefined;

        expect(getScrollPosition(document)).toEqual({ x: scrollLeft, y: scrollTop });
      });
    });
  });
});
