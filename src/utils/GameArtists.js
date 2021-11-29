import Game from "./Game";

export default class GameArtists extends Game{
    constructor(startId, json) {
        super(startId, json);
    }

    get url() {
        return `https://raw.githubusercontent.com/timursk/image-data/master/img/${this.step}.webp`;
    }
    get questionImg() {
        return document.querySelector('.question-img__artists-game');
    }
    get answers() {
        return document.querySelectorAll('.answer-button__artists-game');
    }

    makeAnswers(isRight, idx) {
        
            if (isRight) {
                this.answers[idx].innerHTML = `${this.json[this.step].author}`;
                this.answers[idx].addEventListener('click', () => {
                    this.startStep(true);
                })
            }
            else if (!isRight) {
                let rand = this.random(this.startId, this.startId + 9, true);
                this.answers[idx].innerHTML = `${this.json[rand].author}`;
                this.answers[idx].addEventListener('click', () => {
                    this.startStep(false);
                });             
            }
        
    }

    startGame() {
        document.body.innerHTML = document.body.innerHTML;
        this.history = [this.step];
        //load img
        let promise = this.createPromise(this.questionImg, this.url);
        this.createPromise(this.questionImg, `https://raw.githubusercontent.com/timursk/image-data/master/img/${this.step + 1}.webp`);
        promise.then((url) =>this.questionImg.src = this.url);
        
        //render questions
        let answerId = this.random(0, 3, false);
        this.render(this.answers, answerId, this.makeAnswers);
        //next question
        this.selector.next.addEventListener('click', () => {
            this.completeStep(this)
            this.startGame();
        });
    }
}