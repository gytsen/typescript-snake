import "./styles.scss";

import { Screen, getCoordinateFromCanvas } from "./lib/screen";
import { Coordinate } from "./lib/coordinate";
import { GameMap } from "./lib/map";
import {
  $createElement,
  $document,
  $getElementById,
  $setAttribute,
  $addEventListener,
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
  const coordinate = getCoordinateFromCanvas(location);

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
  const element = $createElement($document, "a") as HTMLAnchorElement;
  $setAttribute(
    element,
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text),
  );
  $setAttribute(element, "download", "map.json");
  element.style.display = "none";
  $document.body.appendChild(element);
  element.click();
  $document.body.removeChild(element);
};

const save = () => {
  download(map.encode());
};

const reset = () => {
  screen.clear();
  map.walls = [];
  wallCount.innerText = 0;
};

const canvasElement = $getElementById(
  $document,
  "map-canvas",
) as HTMLCanvasElement;

const resetButton = $getElementById($document, "reset");
const saveButton = $getElementById($document, "download-map");

const wallCount = $getElementById($document, "wall-count");

const screen: Screen = new Screen(canvasElement);
const map: GameMap = new GameMap(screen.width, screen.height, []);

$addEventListener(resetButton, CLICK, reset);
$addEventListener(saveButton, CLICK, save);
$addEventListener(screen.canvas, CLICK, canvasClickHandler);
