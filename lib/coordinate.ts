export class Coordinate {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  copy(): Coordinate {
    return new Coordinate(this.x, this.y);
  }

  equals(other: Coordinate): boolean {
    return this.x == other.x && this.y == other.y;
  }

  add(other: Coordinate): void {
    this.x += other.x;
    this.y += other.y;
  }
}
