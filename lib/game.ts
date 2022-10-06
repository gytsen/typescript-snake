import { Coordinate } from "./coordinate";
import { Screen } from "./screen";
import { Direction, Snake } from "./snake";

const HEIGHT = 24;
const WIDTH = 24;

const BLACK = "#000";
const RED = "#F00";

const FPS = 5;
const FPS_MILLIS = 1000 / FPS;

const random = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export class Game {
  private readonly _snake: Snake;
  private readonly _screen: Screen;
  private _apple: Coordinate;

  private _interval: number | null;

  constructor(canvas: HTMLCanvasElement) {
    this._screen = new Screen(canvas);
    this._snake = new Snake();
    this._apple = this._generateApple();
  }

  public start(): void {
    this._interval = setInterval(() => window.requestAnimationFrame(() => this._gameTick()), FPS_MILLIS);
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
      this._interval = null;
    }

    if (head.equals(this._apple)) {
      this._apple = this._generateApple();
      preserveTail = true;
    }

    this._snake.addNewHead(head, preserveTail);

    this._screen.drawCoordinates(this._snake.body);
    this._screen.drawCoordinate(this._apple, RED);
  }

  private _isGameOver(head: Coordinate): boolean {
    return this._snake.contains(head);
  }

  private _generateApple(): Coordinate {
    let apple: Coordinate;

    do {
      apple = new Coordinate(
        random(this._screen.width),
        random(this._screen.height)
      );
    } while (this._snake.contains(apple));

    return apple;
  }

  public handleKeypress(event: KeyboardEvent): void {
    switch (event.key) {
      case "w":
      case "ArrowUp":
        this._snake.requestDirectionChange(Direction.up);
        break;
      case "s":
      case "ArrowDown":
        this._snake.requestDirectionChange(Direction.down);
        break;
      case "a":
      case "ArrowLeft":
        this._snake.requestDirectionChange(Direction.left);
        break;
      case "d":
      case "ArrowRight":
        this._snake.requestDirectionChange(Direction.right);
        break;
      default:
        break;
    }

    event.preventDefault();
  }
}
