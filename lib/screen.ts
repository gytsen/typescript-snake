import { Coordinate } from "./coordinate";
import { $floor, BLACK, wrappingClamp } from "./util";

const borderSize = 3;
const boxSize = 20;
const trimmedBoxSize = boxSize - borderSize;

export class Screen {
  private readonly _context: CanvasRenderingContext2D;

  public readonly height: number;
  public readonly width: number;

  public readonly canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    if (canvas.width % boxSize !== 0 || canvas.height % boxSize !== 0) {
      throw new Error(
        `${canvas.height} or ${canvas.width} is not divisible by ${boxSize}`,
      );
    }

    this.height = canvas.height / boxSize;
    this.width = canvas.width / boxSize;
    this.canvas = canvas;
    this._context = canvas.getContext("2d")!;

    this.clear();
  }

  public clear(): void {
    this._context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public wrap(c: Coordinate): Coordinate {
    let x = wrappingClamp(c.x, 0, this.width - 1);
    let y = wrappingClamp(c.y, 0, this.height - 1);

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

    this._context.fillStyle = color;
    this._context.fillRect(
      canvasPoint.x,
      canvasPoint.y,
      trimmedBoxSize,
      trimmedBoxSize,
    );
    this._context.fillStyle = BLACK;
  }

  private _getCanvasDrawPoint(c: Coordinate): Coordinate {
    return new Coordinate(c.x * boxSize, c.y * boxSize);
  }

  public getCoordinateFromCanvas(c: Coordinate): Coordinate {
    return new Coordinate($floor(c.x / boxSize), $floor(c.y / boxSize));
  }
}
