import getScrollPosition from '../helpers/getScrollPosition';

/**
 * Returns the current scroll position if it's greater than the offset. False otherwise.
 *
 * @param {Object} offset
 * @param {number} offset.x
 * @param {number} offset.y
 * @returns {Object}
 */
export default function verifyOffset(offset) {
  const { x, y } = getScrollPosition(this._container);

  return (!offset.x || offset.x < x) && (!offset.y || offset.y < y) && { x, y };
}
