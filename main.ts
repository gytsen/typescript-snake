import { Game } from "./lib/game";

((window, document) => {
    let game: Game | null;

    const running = (): boolean => game?.running() ?? false;

    const onStart = (event: MouseEvent): void => {
        if (running()) {
            return;
        }

        const canvas = document.getElementById('snake-canvas') as HTMLCanvasElement;

        game ??= new Game(canvas);

        document.addEventListener('keypress', (e: KeyboardEvent) => game.handleKeypress(e));
        game.start();
    }

    const startButton = document.getElementById('start-empty');

    startButton.addEventListener('click', onStart);

})(window, document);
