import { Game } from "./lib/game";
import { addEventListener, getElementById, documentAlias } from "./lib/util";
(() => {
    let game;
    const running = () => game?.running() ?? false;
    const onStart = (event) => {
        if (running()) {
            return;
        }
        const canvas = getElementById(documentAlias, "snake-canvas");
        game ??= new Game(canvas);
        addEventListener(documentAlias, "keypress", (e) => game?.handleKeypress(e));
        game.start();
    };
    const startButton = getElementById(documentAlias, "start-empty");
    addEventListener(startButton, "click", onStart);
})();
