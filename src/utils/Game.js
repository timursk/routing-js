export default class Game {
    history = [];
    result = 0;

    constructor(startId, json) {
        this.startId = startId * 10;
        this.step = startId * 10;
        this.json = json;
    }

    get selector() {
        return {
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

    random(min, max, toCheck) {
        let rand = Math.floor(min + Math.random() * (max + 1 - min));
        if (toCheck && this.history.includes(rand)) return this.random(min,max, true);
        if (toCheck) this.history.push(rand);
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
        answers.forEach((answer, idx) => {
            if (idx == answerId) func.call(this, true, idx);
            else func.call(this, false, idx);
        });

    }

    async startStep(isRight) {
        this.result += isRight ? 1 : 0;
        this.selector.form.classList.add('visible');
        this.selector.form.style.background = isRight ? `rgba(0, 255, 0, 80%)` : `rgba(255, 0, 0, 80%)`;
        this.selector.title.innerHTML = this.json[this.step].author;
        this.selector.span.innerHTML = `${this.json[this.step].name}, ${this.json[this.step].year}`;
        this.selector.img.src = this.url;
    }

    async completeStep(answers) {
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

