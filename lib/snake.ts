import { Coordinate } from "./coordinate";

export enum Direction {
  up,
  down,
  left,
  right,
}

export const directionToCoordinate: Map<Direction, Coordinate> = new Map<
  Direction,
  Coordinate
>([
  [Direction.up, new Coordinate(0, -1)],
  [Direction.down, new Coordinate(0, 1)],
  [Direction.left, new Coordinate(-1, 0)],
  [Direction.right, new Coordinate(1, 0)],
]);

const HEAD_INDEX = 0;

export class Snake {
  private _direction: Direction;
  private _requestedDirection: Direction;

  public readonly body: Coordinate[];

  constructor() {
    this.body = [new Coordinate(1, 0), new Coordinate(0, 0)];
    this._direction = Direction.right;
    this._requestedDirection = Direction.right;
  }

  public get size(): number {
    return this.body.length;
  }

  public get head(): Coordinate {
    return this.body[HEAD_INDEX];
  }

  public contains(c: Coordinate): boolean {
    return this.body.some((coordinate) => c.equals(coordinate));
  }

  public headHits(c: Coordinate): boolean {
    return this.head.equals(c);
  }

  public requestDirectionChange(requested: Direction): void {
    this._requestedDirection = requested;
  }

  private _isValidChange(): boolean {
    return !(
      (this._direction == Direction.up &&
        this._requestedDirection == Direction.down) ||
      (this._direction == Direction.down &&
        this._requestedDirection == Direction.up) ||
      (this._direction == Direction.left &&
        this._requestedDirection == Direction.right) ||
      (this._direction == Direction.right &&
        this._requestedDirection == Direction.left)
    );
  }

  public updateDirection(): void {
    if (!this._isValidChange()) {
      return;
    }

    this._direction = this._requestedDirection;
  }

  public newHead(): Coordinate {
    const head = this.head.copy();

    head.add(directionToCoordinate.get(this._direction));
    return head;
  }

  public addNewHead(newHead: Coordinate, preserveTail: boolean = false): void {
    this.body.unshift(newHead);
    if (!preserveTail) {
      this.body.pop();
    }
  }
}
