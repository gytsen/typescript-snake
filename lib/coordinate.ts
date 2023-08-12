export class Coordinate {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export const equals = (src: Coordinate, target: Coordinate) =>
  src.x === target.x && src.y === target.y;
