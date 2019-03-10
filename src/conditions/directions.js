import getScrollPosition from '../helpers/getScrollPosition';

function getCoordinates(directions) {
  const primitiveDirections = directions.reduce(
    (primitiveDirections, directions) => {

    },
    [],
  );

  const directionsMap = {
    up: { axis: 'y', value: 1 },
    down: { axis: 'y', value: -1 },
    left: { axis: 'x', value: -1 },
    right: { axis: 'x', value: 1 },
  };

  return directions.reduce((coordinates, direction) => {
    coordinates[directionsMap[direction].axis] += directionsMap[direction].value;
    return coordinates;
  }, { x: null, y: null });
}

export default function verifyDirections(directions) {
  const coordinates = getCoordinates(directions);

  const { x, y } = getScrollPosition();
  const offsetDiffX = x - this._scrollOffset.x;
  const offsetDiffY = y - this._scrollOffset.y;
  this._scrollOffset.x = offsetDiffX;
  this._scrollOffset.y = offsetDiffY;

  return offsetDiffX && coordinates.x === 0 || offsetDiffX / coordinates.x > 0
    || offsetDiffY && coordinates.y === 0 || offsetDiffY / coordinates.y > 0;
}
