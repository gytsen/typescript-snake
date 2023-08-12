import "./styles.scss";

import { Game } from "./lib/game";
import {
  addEventListener,
  getElementById,
  documentAlias,
  querySelectorAll,
  CLICK,
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

    const canvas = getElementById(
      documentAlias,
      "snake-canvas",
    ) as HTMLCanvasElement;

    game ??= new Game(canvas);

    if (map) {
      game.map = map;
    }

    addEventListener(
      documentAlias,
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
    const text = getElementById(documentAlias, "map-textarea");
    map = decode(text.value);
    closeModal();
    onStart();
  };

  const closeModal = () => mapModal.classList.remove("is-active");

  const startButton = getElementById(documentAlias, "start-empty");
  const mapModal = getElementById(documentAlias, "map-modal");
  const startMap = getElementById(documentAlias, "start-map");
  const loadMap = getElementById(documentAlias, "load-map");

  const closeModalElements = Array.from(
    querySelectorAll(documentAlias, ".close-map-modal"),
  );
  for (const element of closeModalElements) {
    addEventListener(element, CLICK, closeModal);
  }

  addEventListener(startMap, CLICK, showMapPicker);
  addEventListener(loadMap, CLICK, saveMap);
  addEventListener(startButton, CLICK, onStart);
})();
