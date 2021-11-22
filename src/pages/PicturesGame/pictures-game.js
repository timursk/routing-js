import PicturesGameElement from './pictures-game.html';

export class PicturesGame {
    constructor() {}

    async render () {
        return PicturesGameElement;
    }

    async after_render () {};
}