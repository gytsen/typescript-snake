import { Game } from "./lib/game";
import { addEventListener, getElementById, documentAlias } from "./lib/util";

(() => {
  let game: Game | null;

  const running = (): boolean => game?.running() ?? false;

  const onStart = (event: MouseEvent): void => {
    if (running()) {
      return;
    }

    const canvas = getElementById(documentAlias, "snake-canvas") as HTMLCanvasElement;

    game ??= new Game(canvas);

    addEventListener(documentAlias, "keypress", (e: KeyboardEvent) =>
      game.handleKeypress(e)
    );
    game.start();
  };

  const startButton = getElementById(documentAlias, "start-empty");

  addEventListener(startButton, "click", onStart);
})();
