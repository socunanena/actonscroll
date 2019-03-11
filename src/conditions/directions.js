import getScrollPosition from '../helpers/getScrollPosition';

function parse(directions) {
  // const primitiveDirections = directions.reduce(
  //   (primitiveDirections, directions) => {
  //
  //   },
  //   [],
  // );

  const config = {
    up: { axis: 'y', value: 1 },
    down: { axis: 'y', value: -1 },
    left: { axis: 'x', value: -1 },
    right: { axis: 'x', value: 1 },
  };
  const parsed = { x: false, y: false };

  directions.map((direction) => parsed[config[direction].axis] += config[direction].value);

  return parsed;
}

export default function verifyDirections(directions) {
  const config = parse(directions);

  const { x, y } = getScrollPosition(this._container);
  const offsetDiffX = x - this._scrollOffset.x;
  const offsetDiffY = y - this._scrollOffset.y;
  this._scrollOffset.x = x;
  this._scrollOffset.y = y;

  return config.x !== false && offsetDiffX && (config.x === 0 || offsetDiffX / config.x > 0) && (offsetDiffX > 0 && 'right' || offsetDiffX < 0 && 'left')
  || config.y !== false && offsetDiffY && (config.y === 0 || offsetDiffY / config.y > 0) && (offsetDiffY > 0 && 'up' || offsetDiffY < 0 && 'down');
}
