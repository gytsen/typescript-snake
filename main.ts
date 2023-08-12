import "./styles.scss";

import { Game } from "./lib/game";
import {
  $addEventListener,
  $getElementById,
  $document,
  $querySelectorAll,
  CLICK,
  $arrayFrom,
} from "./lib/util";
import { GameMap, decode } from "./lib/map";

(() => {
  let game: Game | undefined = undefined;
  let map: GameMap | undefined = undefined;

  const running = (): boolean => game?.running() ?? false;

  const onStart = (): void => {
    if (running()) {
      return;
    }

    const canvas = $getElementById(
      $document,
      "snake-canvas",
    ) as HTMLCanvasElement;

    game ??= new Game(canvas);

    if (map) {
      game.map = map;
    }

    $addEventListener(
      $document,
      "keypress",
      (e: KeyboardEvent) => game?.handleKeypress(e),
    );
    game.start();
  };

  const showMapPicker = () => {
    if (running()) {
      return;
    }

    mapModal.classList.add("is-active");
  };

  const saveMap = () => {
    const text = $getElementById($document, "map-textarea");
    map = decode(text.value);
    closeModal();
    onStart();
  };

  const closeModal = () => mapModal.classList.remove("is-active");

  const startButton = $getElementById($document, "start-empty");
  const mapModal = $getElementById($document, "map-modal");
  const startMap = $getElementById($document, "start-map");
  const loadMap = $getElementById($document, "load-map");

  const closeModalElements = $arrayFrom(
    $querySelectorAll($document, ".close-map-modal"),
  );
  for (const element of closeModalElements) {
    $addEventListener(element, CLICK, closeModal);
  }

  $addEventListener(startMap, CLICK, showMapPicker);
  $addEventListener(loadMap, CLICK, saveMap);
  $addEventListener(startButton, CLICK, onStart);
})();
