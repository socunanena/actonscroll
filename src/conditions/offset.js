import getScrollPosition from '../helpers/getScrollPosition';

/**
 * Returns true if the current scroll position is greater than the offset. False otherwise.
 *
 * @param {number} offset
 * @returns {boolean}
 */
export default function offset(offset) {
  const { y } = getScrollPosition(this._container);
  return offset < y;
}
