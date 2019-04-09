import getScrollPosition from '../helpers/getScrollPosition';
import directionsConversion from '../config/directions';

function toPrimitives(directions) {
  return [...new Set(directions.reduce(
    (primitives, direction) => [...primitives, ...directionsConversion[direction]],
    [],
  ))];
}

function parse(directions) {
  const primitives = toPrimitives(directions);

  const config = {
    up: { axis: 'y', value: 1 },
    down: { axis: 'y', value: -1 },
    left: { axis: 'x', value: 1 },
    right: { axis: 'x', value: -1 },
  };
  const parsed = { x: false, y: false };

  primitives.map((direction) => parsed[config[direction].axis] += config[direction].value);

  return parsed;
}

/**
 * Returns the direction to which the scroll is moving if it's in the configured directions. False otherwise.
 *
 * @param {string[]} directions
 * @returns {string}
 */
export default function verifyDirections(directions) {
  const config = parse(directions);

  const { x, y } = getScrollPosition(this._container);
  const offsetDiffX = x - this._scrollOffset.x;
  const offsetDiffY = y - this._scrollOffset.y;
  this._scrollOffset.x = x;
  this._scrollOffset.y = y;

  return config.x !== false && offsetDiffX && (config.x === 0 || offsetDiffX / config.x > 0) && (offsetDiffX > 0 && 'left' || offsetDiffX < 0 && 'right')
  || config.y !== false && offsetDiffY && (config.y === 0 || offsetDiffY / config.y > 0) && (offsetDiffY > 0 && 'up' || offsetDiffY < 0 && 'down');
}
