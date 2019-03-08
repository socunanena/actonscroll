import getScrollPosition from '../helpers/getScrollPosition';

/**
 * Returns true if the current scroll position is greater than the offset. False otherwise.
 *
 * @param {number} offset
 * @returns {boolean}
 */
export default function offset(offset) {
  return offset < getScrollPosition(this._container);
}
