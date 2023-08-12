import { Coordinate } from "./coordinate";

export type Direction = 0 | 1 | 2 | 3;

export const DIRECTION_UP: Direction = 0;
export const DIRECTION_DOWN: Direction = 1;
export const DIRECTION_LEFT: Direction = 2;
export const DIRECTION_RIGHT: Direction = 3;

export const directionMapping: {
  0: Coordinate;
  1: Coordinate;
  2: Coordinate;
  3: Coordinate;
} = {
  0: new Coordinate(0, -1),
  1: new Coordinate(0, 1),
  2: new Coordinate(-1, 0),
  3: new Coordinate(1, 0),
};

const HEAD_INDEX = 0;

export class Snake {
  private _direction: 0 | 1 | 2 | 3;
  private _requestedDirection: 0 | 1 | 2 | 3;

  public readonly _body: Coordinate[];

  constructor() {
    this._body = [new Coordinate(1, 0), new Coordinate(0, 0)];
    this._direction = DIRECTION_RIGHT;
    this._requestedDirection = DIRECTION_RIGHT;
  }

  public get body(): Coordinate[] {
    return this._body;
  }

  public get size(): number {
    return this._body.length;
  }

  public get head(): Coordinate {
    return this._body[HEAD_INDEX];
  }

  public contains(c: Coordinate): boolean {
    return this._body.some((coordinate) => c.equals(coordinate));
  }

  public headHits(c: Coordinate): boolean {
    return this.head.equals(c);
  }

  public requestDirectionChange(requested: Direction): void {
    this._requestedDirection = requested;
  }

  private _isValidChange(): boolean {
    const direction = this._direction;
    const requestedDirection = this._requestedDirection;
    return !(
      (direction == DIRECTION_UP && requestedDirection == DIRECTION_DOWN) ||
      (direction == DIRECTION_DOWN && requestedDirection == DIRECTION_UP) ||
      (direction == DIRECTION_LEFT && requestedDirection == DIRECTION_LEFT) ||
      (direction == DIRECTION_RIGHT && requestedDirection == DIRECTION_RIGHT)
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
    const direction = directionMapping[this._direction];

    head.add(direction);
    return head;
  }

  public addNewHead(newHead: Coordinate, preserveTail: boolean = false): void {
    this._body.unshift(newHead);
    if (!preserveTail) {
      this._body.pop();
    }
  }
}
