/**
 * Gets the vertical offset of the scroll of the container.
 *
 * @returns {number}
 */
export default function getScrollPosition(container) {
  if (container instanceof Element) {
    return {
      x: container.scrollLeft,
      y: container.scrollTop,
    };
  } else {
    return {
      x: window.scrollX
      || window.pageXOffset
      || document.body.scrollLeft
      + (document.documentElement && document.documentElement.scrollLeft || 0),
      y: window.scrollY
      || window.pageYOffset
      || document.body.scrollTop
      + (document.documentElement && document.documentElement.scrollTop || 0),
    };
  }
}
