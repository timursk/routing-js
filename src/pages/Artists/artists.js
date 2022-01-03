import ArtistsElement from './artists.html';

export class Artists {
    constructor() {}

    async render () {
        return ArtistsElement;
    }

    async after_render () {};
}