import GameArtists from "./GameArtists";

export default class Game {
    history = [];
    result = 0;

    constructor(startId, json) {
        this.startId = startId * 10;
        this.step = startId * 10;
        this.json = json;
        this.selector = {
            circles : document.querySelectorAll('.list-item__pictures-game'),
            form    : document.querySelector('.answered'),
            img     : document.querySelector('.answered-img'),
            title   : document.querySelector('.answered-title'),
            span    : document.querySelector('.answered-info'),
            done    : document.querySelector('.done'),
            error   : document.querySelector('.error'),
            next    : document.querySelector('.next'),
            finish  : document.querySelector('.finish'),
            result  : document.querySelector('.finish-result'),
            answers : document.querySelectorAll('.answer-button__artists-game'),
        }
    }

    random(min, max) {
        let rand = Math.floor(min + Math.random() * (max + 1 - min));
        rand = this.history.includes(rand) ? this.random(min, max) : rand;
        this.history.push(rand);
        return rand;
    }

    async createPromise(img, url) {
        return new Promise((resolve, reject) => {
            let preload = new Image();
            preload.src = url;
            preload.onload = resolve(url);
        });
    }

    async render(answers, answerId, func) {
        if (this.step - this.startId !== 0) document.body.innerHTML = document.body.innerHTML;
        console.log(this.selector.answers);
        
        answers.forEach((answer, idx) => {
            if (idx == answerId) func.call(this, true, idx);
            else func.call(this, false, idx);
        });

    }

    async startStep(isRight) {
        this.result += isRight ? 1 : 0;
        this.selector.form.classList.add('visible');
        this.selector.form.style.background = isRight ? `rgba(0, 255, 0, 80%)` : `rgba(255, 0, 0, 80%)`;
        console.log('Step is', this.step);
        this.selector.title.innerHTML = this.json[this.step].author;
        this.selector.span.innerHTML = `${this.json[this.step].name}, ${this.json[this.step].year}`;
        this.selector.img.src = this.url;
    }

    async completeStep(answers) {
        console.log('URAAAAAAAAAAAAAAAAAAAAAAAAAA');
        if (this.step == this.startId + 9) {
            this.selector.finish.classList.add('visible');
            this.selector.result.innerHTML = this.result;
        }
        else {
            this.step += 1;
            this.selector.form.classList.remove('visible');
        }
    }

}

