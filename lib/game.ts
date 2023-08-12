import { Coordinate } from "./coordinate";
import { GameMap } from "./map";
import { Screen } from "./screen";
import { Direction, Snake } from "./snake";
import { $random, $floor, $global, BROWN } from "./util";

const HEIGHT = 24;
const WIDTH = 24;

const BLACK = "#000";
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

  public handleKeypress(event: KeyboardEvent): void {
    switch (event.key) {
      case "w":
      case ARROW_UP:
        this._snake.requestDirectionChange(Direction.up);
        break;
      case "s":
      case ARROW_DOWN:
        this._snake.requestDirectionChange(Direction.down);
        break;
      case "a":
      case ARROW_LEFT:
        this._snake.requestDirectionChange(Direction.left);
        break;
      case "d":
      case ARROW_RIGHT:
        this._snake.requestDirectionChange(Direction.right);
        break;
      default:
        break;
    }

    event.preventDefault();
  }
}
