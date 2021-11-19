import TestElement from './test.html';

export class Test {
    constructor() {}

    async render () {
        return TestElement;
    }

    async after_render () {};
}