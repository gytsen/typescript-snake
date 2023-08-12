import { Coordinate } from "./coordinate";
import { GameMap } from "./map";
import { Screen } from "./screen";
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  Direction,
  Snake,
} from "./snake";
import { $random, $floor, $global, BROWN } from "./util";

const RED = "#F00";

const ARROW = "Arrow";
const ARROW_UP = ARROW + "Up";
const ARROW_DOWN = ARROW + "Down";
const ARROW_LEFT = ARROW + "Left";
const ARROW_RIGHT = ARROW + "Right";

const FPS = 5;
const FPS_MILLIS = 1000 / FPS;

const boundedRandom = (max: number) => {
  return $floor($random() * $floor(max));
};

export class Game {
  private readonly _snake: Snake;
  private readonly _screen: Screen;
  private _apple: Coordinate;
  private _map: GameMap | undefined;

  private _interval: number | undefined;

  constructor(canvas: HTMLCanvasElement) {
    this._screen = new Screen(canvas);
    this._snake = new Snake();
    this._apple = this._generateApple();
    this._interval = undefined;
    this._map = undefined;
  }

  public start(): void {
    this._interval = setInterval(
      () => $global.requestAnimationFrame(() => this._gameTick()),
      FPS_MILLIS,
    );
  }

  public set map(map: GameMap) {
    this._map = map;
  }

  public running(): boolean {
    return this._interval != null;
  }

  public paused(): boolean {
    return !this.running();
  }

  private _gameTick(): void {
    let preserveTail: boolean = false;

    this._screen.clear();

    this._snake.updateDirection();

    let head = this._snake.newHead();

    head = this._screen.wrap(head);

    if (this._isGameOver(head)) {
      clearInterval(this._interval);
      this._interval = undefined;
    }

    if (head.equals(this._apple)) {
      this._apple = this._generateApple();
      preserveTail = true;
    }

    this._snake.addNewHead(head, preserveTail);

    this._screen.drawCoordinates(this._snake.body);
    this._screen.drawCoordinate(this._apple, RED);
    if (this._map) {
      this._screen.drawCoordinates(this._map._walls, BROWN);
    }
  }

  private _isGameOver(head: Coordinate): boolean {
    return this._snake.contains(head) || (this._map?.hasWall(head) ?? false);
  }

  private _generateApple(): Coordinate {
    let apple: Coordinate;

    do {
      apple = new Coordinate(
        boundedRandom(this._screen.width),
        boundedRandom(this._screen.height),
      );
    } while (this._snake.contains(apple));

    return apple;
  }

  private _requestDirectionChange(direction: Direction) {
    this._snake.requestDirectionChange(direction);
  }

  public handleKeypress(event: KeyboardEvent): void {
    switch (event.key) {
      case "w":
      case ARROW_UP:
        this._requestDirectionChange(DIRECTION_UP);
        break;
      case "s":
      case ARROW_DOWN:
        this._requestDirectionChange(DIRECTION_DOWN);
        break;
      case "a":
      case ARROW_LEFT:
        this._requestDirectionChange(DIRECTION_LEFT);
        break;
      case "d":
      case ARROW_RIGHT:
        this._requestDirectionChange(DIRECTION_RIGHT);
        break;
      default:
        break;
    }

    event.preventDefault();
  }
}
