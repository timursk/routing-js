import settingsElement from './settings.html';

export class Settings {
    constructor() {}

    async render () {
        return settingsElement;
    }

    async after_render () {};
}