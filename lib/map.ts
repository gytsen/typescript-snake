import { Coordinate } from "./coordinate";
import { getOwnPropertyNames } from "./util";

const requiredGameMapProps = new Set(["height", "width", "walls"]);
const requiredCoordinateProps = new Set(["x", "y"]);

const checkRequiredProps = (
  object: Record<string, unknown>,
  requiredProps: Set<string>,
  target: string,
) => {
  const props = new Set(getOwnPropertyNames(object));
  for (const requiredProp of requiredProps.values()) {
    if (!props.has(requiredProp)) {
      throw new Error(`missing required property ${requiredProp} on ${target}`);
    }
  }
};

export const decode = (blob: string): GameMap => {
  const object: Record<string, number | Record<string, number>[]> =
    JSON.parse(blob);
  checkRequiredProps(object, requiredGameMapProps, "gameMap");

  if (!object.walls || !Array.isArray(object.walls)) {
    throw new Error("missing walls property, or walls is not an array");
  }

  const walls = [];

  for (const wall of object.walls) {
    checkRequiredProps(wall, requiredCoordinateProps, "coordinate");
    walls.push(new Coordinate(wall.x, wall.y));
  }

  return new GameMap(object.height as number, object.width as number, walls);
};

export class GameMap {
  _height: number;
  _width: number;
  _walls: Coordinate[];

  constructor(height: number, width: number, walls: Coordinate[]) {
    this._height = height;
    this._width = width;
    this._walls = walls;
  }

  isCompatibleWith(height: number, width: number): boolean {
    return this._height === height && this._width === width;
  }

  // uuuugh, O(n) searches because we can't
  // overload equality on sets
  _findWallIndex(wall: Coordinate): number {
    return this._walls.findIndex(
      (value) => value.x === wall.x && value.y === wall.y,
    );
  }

  addWall(wall: Coordinate) {
    if (this._findWallIndex(wall) === -1) {
      this._walls.push(wall);
    }
  }

  removeWall(wall: Coordinate) {
    const index = this._findWallIndex(wall);
    if (index !== -1) {
      this._walls.splice(index, 1);
    }
  }

  hasWall(wall: Coordinate) {
    return this._findWallIndex(wall) !== -1;
  }

  encode(): string {
    const map: Record<string, unknown> = {
      width: this._width,
      height: this._height,
      walls: this._walls,
    };

    return JSON.stringify(map);
  }
}
