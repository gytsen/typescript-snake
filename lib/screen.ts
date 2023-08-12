import { Coordinate } from "./coordinate";
import { $floor, BLACK, wrappingClamp } from "./util";

const borderSize = 3;
const boxSize = 20;
const trimmedBoxSize = boxSize - borderSize;

const drawCoordinate = (
  context: CanvasRenderingContext2D,
  coordinate: Coordinate,
  color: string = BLACK,
): void => {
  const canvasPoint = getCanvasDrawPoint(coordinate);

  context.fillStyle = color;
  context.fillRect(
    canvasPoint.x,
    canvasPoint.y,
    trimmedBoxSize,
    trimmedBoxSize,
  );
  context.fillStyle = BLACK;
};

const getCanvasDrawPoint = (c: Coordinate): Coordinate => {
  return new Coordinate(c.x * boxSize, c.y * boxSize);
};

export const getCoordinateFromCanvas = (c: Coordinate): Coordinate => {
  return new Coordinate($floor(c.x / boxSize), $floor(c.y / boxSize));
};

export const wrap = (screen: Screen, c: Coordinate) => {
  const x = wrappingClamp(c.x, 0, screen.width - 1);
  const y = wrappingClamp(c.y, 0, screen.height - 1);

  return new Coordinate(x, y);
};

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

  public drawCoordinates(
    coordinates: Iterable<Coordinate>,
    color: string = BLACK,
  ): void {
    for (const coordinate of coordinates) {
      drawCoordinate(this._context, coordinate, color);
    }
  }
}
