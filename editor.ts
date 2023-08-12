import "./styles.scss";

import { Screen } from "./lib/screen";
import { Coordinate } from "./lib/coordinate";
import { GameMap } from "./lib/map";
import {
  createElement,
  documentAlias,
  getElementById,
  setAttribute,
  addEventListener,
  CLICK,
  BROWN,
} from "./lib/util";

const getCanvasPosition = (
  canvas: HTMLCanvasElement,
  event: MouseEvent,
): Coordinate => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return new Coordinate(x, y);
};

const canvasClickHandler = (event: MouseEvent): void => {
  const location = getCanvasPosition(screen.canvas, event);
  const coordinate = screen.getCoordinateFromCanvas(location);

  if (map.hasWall(coordinate)) {
    map.removeWall(coordinate);
  } else {
    map.addWall(coordinate);
  }

  wallCount.innerText = map.size;

  screen.clear();
  screen.drawCoordinates(map.walls, BROWN);
};

const download = (text: string) => {
  const element = createElement(documentAlias, "a") as HTMLAnchorElement;
  setAttribute(
    element,
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text),
  );
  setAttribute(element, "download", "map.json");
  element.style.display = "none";
  documentAlias.body.appendChild(element);
  element.click();
  documentAlias.body.removeChild(element);
};

const save = () => {
  download(map.encode());
};

const reset = () => {
  screen.clear();
  map.walls = [];
  wallCount.innerText = 0;
};

const canvasElement = getElementById(
  documentAlias,
  "map-canvas",
) as HTMLCanvasElement;

const resetButton = getElementById(documentAlias, "reset");
const saveButton = getElementById(documentAlias, "download-map");

const wallCount = getElementById(documentAlias, "wall-count");

const screen: Screen = new Screen(canvasElement);
const map: GameMap = new GameMap(screen.width, screen.height, []);

addEventListener(resetButton, CLICK, reset);
addEventListener(saveButton, CLICK, save);
addEventListener(screen.canvas, CLICK, canvasClickHandler);
