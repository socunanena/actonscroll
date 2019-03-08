/**
 * Gets the vertical offset of the scroll of the container.
 *
 * @returns {number}
 */
export default function getScrollPosition(container) {
  if (container instanceof Element) {
    return container.scrollTop;
  } else {
    return window.scrollY
      || window.pageYOffset
      || document.body.scrollTop
        + (document.documentElement && document.documentElement.scrollTop || 0);
  }
}
