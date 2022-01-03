import ErrorElement from './error.html';

export class Error {
    constructor() {}

    async render () {
        return ErrorElement;
    }

    async after_render () {};
}