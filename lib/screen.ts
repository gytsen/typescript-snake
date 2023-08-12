import { Coordinate } from "./coordinate";
import { floor } from "./util";

const BLACK = "#000";

export class Screen {
  private readonly _context: CanvasRenderingContext2D;
  private readonly _boxSize: number;

  private readonly _borderSize: number;
  private readonly _borderTranspose: Coordinate;

  public readonly height: number;
  public readonly width: number;

  public readonly canvas: HTMLCanvasElement;

  constructor(
    canvas: HTMLCanvasElement,
    borderSize: number = 3,
    boxSize: number = 20,
  ) {
    if (canvas.width % boxSize !== 0 || canvas.height % boxSize !== 0) {
      throw new Error(
        `${canvas.height} or ${canvas.width} is not divisible by ${boxSize}`,
      );
    }

    this.height = canvas.height / boxSize;
    this.width = canvas.width / boxSize;
    this._boxSize = boxSize;
    this._borderSize = borderSize;
    this._borderTranspose = new Coordinate(borderSize, borderSize);
    this.canvas = canvas;
    this._context = canvas.getContext("2d")!;

    this.clear();
  }

  private get _trimmedBoxSize(): number {
    return this._boxSize - this._borderSize;
  }

  public clear(): void {
    this._context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public wrap(c: Coordinate): Coordinate {
    let x = c.x;
    let y = c.y;

    if (c.x > this.width - 1) {
      x = 0;
    } else if (c.x < 0) {
      x = this.width - 1;
    }

    if (c.y > this.height - 1) {
      y = 0;
    } else if (c.y < 0) {
      y = this.height - 1;
    }

    return new Coordinate(x, y);
  }

  public drawCoordinates(
    coordinates: Iterable<Coordinate>,
    color: string = BLACK,
  ): void {
    for (const coordinate of coordinates) {
      this.drawCoordinate(coordinate, color);
    }
  }

  public drawCoordinate(coordinate: Coordinate, color: string = BLACK): void {
    const canvasPoint = this._getCanvasDrawPoint(coordinate);
    canvasPoint.add(this._borderTranspose);

    this._context.fillStyle = color;
    this._context.fillRect(
      canvasPoint.x,
      canvasPoint.y,
      this._trimmedBoxSize,
      this._trimmedBoxSize,
    );
    this._context.fillStyle = BLACK;
  }

  private _getCanvasDrawPoint(c: Coordinate): Coordinate {
    return new Coordinate(c.x * this._boxSize, c.y * this._boxSize);
  }

  public getCoordinateFromCanvas(c: Coordinate): Coordinate {
    return new Coordinate(
      floor(c.x / this._boxSize),
      floor(c.y / this._boxSize),
    );
  }
}
