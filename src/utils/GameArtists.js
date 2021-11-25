import Game from "./Game";

export default class GameArtists extends Game{
    constructor(startId, json) {
        super(startId, json);
        this.selector.questionImg = document.querySelector('.question-img__artists-game');
        this.selector.answers = document.querySelectorAll('.answer-button__artists-game');
        this.url = `https://raw.githubusercontent.com/timursk/image-data/master/img/${this.step}.webp`;
    }

    makeAnswers(isRight, idx) {
        
            if (isRight) {
                this.selector.answers[idx].innerHTML = `${this.json[this.step].author}`;
                this.selector.answers[idx].addEventListener('click', () => {
                    this.startStep(true);
                })
            }
            else if (!isRight) {
                let rand = this.random(this.startId, this.startId + 9);
                this.history.push(rand);
                this.selector.answers[idx].innerHTML = `${this.json[rand].author}`;
                this.selector.answers[idx].addEventListener('click', () => {
                    this.startStep(false);
                });             
            }
        
    }

    startGame() {
        this.history = [];
        //load img
        let promise = this.createPromise(this.selector.questionImg, this.url);
        promise.then((url) =>this.selector.questionImg.src = this.url);
        
        //render questions
        let answerId = this.random(0, 3);
        this.render(this.selector.answers, answerId, this.makeAnswers);
        //next question
        this.selector.next.addEventListener('click', () => {
            this.completeStep(this)
        });


    }
}