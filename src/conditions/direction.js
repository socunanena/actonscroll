import getScrollPosition from '../helpers/getScrollPosition';

/**
 * Returns true if the scroll direction is the same than the passed as argument. False otherwise.
 *
 * @param {string} direction
 * @returns {boolean}
 */
export default function direction(direction) {
  const directions = { up: 1, down: -1 };

  const currentScrollOffset = getScrollPosition(this._container);
  const offsetDiff = currentScrollOffset - this._scrollOffset;
  this._scrollOffset = currentScrollOffset;

  return offsetDiff / directions[direction] > 0;
}
