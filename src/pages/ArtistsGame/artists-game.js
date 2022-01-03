import ArtistsGameElement from './artists-game.html';

export class ArtistsGame {
    constructor() {}

    async render () {
        return ArtistsGameElement;
    }

    async after_render () {};
}