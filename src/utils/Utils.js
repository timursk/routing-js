export const Utils = {
    parseURL: () => {
        const url = location.hash.slice(1).toLowerCase() || '/';
        const urlArr = url.split('/');
        const request = {
            resource: null,
            id: null,
        };

        request.resource = urlArr[1];
        request.id = urlArr[2];

        return request;
    },
    Game: class {
        constructor(num) {
            this.startId = num * 10;
        }
        static history = [];
        static answer = (isRight) => {console.log(isRight)};

        async render() {
            Utils.Game.history = [];
            const img = document.querySelector('.test_game');
            const answerArr = document.querySelectorAll('.answer');
            let answerId = Utils.random(0,3);

            img.src = `./pages/Test/src/${this.startId}.jpg`;
            Utils.Game.history.push(this.startId);

            answerArr.forEach((answer, idx) => {
                if (idx == answerId) {
                    answerArr[answerId].innerHTML = `${this.startId}`;
                    answerArr[answerId].addEventListener('click', () => Utils.Game.answer(true));
                } else {
                    let rand =  Utils.random(this.startId, this.startId + 9, true);
                    Utils.Game.history.push(rand);
                    answer.innerHTML = `${rand}`;
                    answer.addEventListener('click', () => Utils.Game.answer(false));
                }
            });
        }


    },
    random: (min, max, check) => {
        let rand = Math.floor(min + Math.random() * (max + 1 - min));
        if (check) {
            return Utils.Game.history.indexOf(rand) == -1 ? rand : Utils.random(min, max, true);
        } else return rand;
    }
}

export default Utils;