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
        constructor(num, json) {
            this.startId = num * 10;
            this.id = this.startId;
            this.json = json;
        }
        static history = [];
        static result = 0;
        static async loadImg(img, src) {
            img.src = src;
            // img.onload = () => {console.log('loaded')};
        };
        static answer = async (isRight, id, startId, json) => {
            this.result += isRight ? 1 : 0;
            // console.log('res is ', this.result);
            // console.log('img number ', id);
            // console.log(Utils.Settings.sound());
            const form = document.querySelector('.answered');
            const img = document.querySelector('.answered-img');
            const title = document.querySelector('.answered-title');
            const span = document.querySelector('.answered-info');
            const done = document.querySelector('.done');
            const error = document.querySelector('.error');
            const circles = document.querySelectorAll('.list-item__pictures-game');
            circles[id - startId].style.background = isRight ? 'green' : 'red';

            isRight ? done.play() : error.play();
            form.classList.add('visible');
            form.style.background = isRight ? `rgba(0, 255, 0, 80%)` : `rgba(255, 0, 0, 80%)`;
            // await Utils.Game.loadImg(img, `https://raw.githubusercontent.com/irinainina/image-data/master/img/${id}.jpg`);
            await Utils.Game.loadImg(img, `https://raw.githubusercontent.com/timursk/image-data/master/img/${id}.webp`);
            title.innerHTML = json[id].author;
            span.innerHTML = `${json[id].name}, ${json[id].year}`;
            const next = document.querySelector('.next');
            next.addEventListener('click', () => {
                form.classList.remove('visible');
                doNext.call(this);
            });


            function doNext() {
                if (id == startId + 9) {
                    const finish = document.querySelector('.finish');
                    const result = document.querySelector('.finish-result');
                    finish.classList.add('visible');
                    result.innerHTML = this.result;

                    let rez = localStorage.getItem(`${startId / 10}record`);
                    // console.log('rez from local', rez);
                    if (rez!==undefined && rez < this.result || rez == null) {
                        localStorage.setItem(`${startId / 10}record`, this.result);
                    }
                    // console.log('STOP THIS', this.result);
                    // console.log(finish);
                    
                }
                id = id + 1;
                this.prototype.render(id, startId, json);
            }
        };

        async render(id = this.id, startId = this.startId, json = this.json) {
            document.body.innerHTML = document.body.innerHTML; // delete all event listeners
            let arrOfSound = document.querySelectorAll('.audio');
            arrOfSound.forEach((sound) => {
                sound.volume = +Utils.Settings.sound().volume;
                sound.muted =  Utils.Settings.sound().isMuted == 'true' ? true : false;
            });

            Utils.Game.history = [];
            const img = document.querySelector('.question-img__artists-game');
            const answerArr = document.querySelectorAll('.answer-button__artists-game');
            let answerId = Utils.random(0,3);


            // await Utils.Game.loadImg(img, `https://raw.githubusercontent.com/irinainina/image-data/master/img/${id}.jpg`);
            await Utils.Game.loadImg(img, `https://raw.githubusercontent.com/timursk/image-data/master/img/${id}.webp`);
            // img.src = `https://raw.githubusercontent.com/irinainina/image-data/master/img/${id}.jpg`;
            Utils.Game.history.push(id);
            // console.log('start ', startId);
            answerArr.forEach((answer, idx) => {
                if (idx == answerId) {
                    answerArr[answerId].innerHTML = `${json[id].author}`;
                    answerArr[answerId].addEventListener('click', () => Utils.Game.answer(true, id, startId, json));
                } else {
                    let rand = Utils.random(startId, startId + 9, true);
                    Utils.Game.history.push(rand);
                    answer.innerHTML = `${json[rand].author}`;
                    answer.addEventListener('click', () => Utils.Game.answer(false, id, startId, json));
                }
            });
        }


    },
    random: (min, max, check) => {
        let rand = Math.floor(min + Math.random() * (max + 1 - min));
        if (check) {
            return Utils.Game.history.indexOf(rand) == -1 ? rand : Utils.random(min, max, true);
        } else return rand;
    },
    randomPictures: (min, max, check) => {
        let rand = Math.floor(min + Math.random() * (max + 1 - min));
        if (check) {
            return Utils.GamePictures.history.indexOf(rand) == -1 ? rand : Utils.randomPictures(min, max, true);
        } else return rand;
    },
    GamePictures: class {
        constructor(num, json) {
            this.startId = num * 10;
            this.id = this.startId;
            this.json = json;
        }
        static history = [];
        static result = 0;
        static async loadImg(img, src) {
            img.src = src;
            // img.onload = () => {console.log('loaded')};
        };

        static answer = async (isRight, id, startId, json) => {
            this.result += isRight ? 1 : 0;
            // console.log('res is ', this.result);
            // console.log('img number ', id);
            // console.log(Utils.Settings.sound());

            const circles = document.querySelectorAll('.list-item__pictures-game');
            circles[id - startId].style.background = isRight ? 'green' : 'red';
            const form = document.querySelector('.answered');
            const img = document.querySelector('.answered-img');
            const title = document.querySelector('.answered-title');
            const span = document.querySelector('.answered-info');
            const done = document.querySelector('.done');
            const error = document.querySelector('.error');

            isRight ? done.play() : error.play();
            form.classList.add('visible');
            form.style.background = isRight ? `rgba(0, 255, 0, 80%)` : `rgba(255, 0, 0, 80%)`;
            // await Utils.Game.loadImg(img, `https://raw.githubusercontent.com/irinainina/image-data/master/img/${id}.jpg`);
            await Utils.GamePictures.loadImg(img, `https://raw.githubusercontent.com/timursk/image-data/master/img/${id}.webp`);
            title.innerHTML = json[id].author;
            span.innerHTML = `${json[id].name}, ${json[id].year}`;


            const next = document.querySelector('.next');
            next.addEventListener('click', () => {
                form.classList.remove('visible');
                doNext.call(this);
            });


            function doNext() {
                if (id == startId + 9) {
                    const finish = document.querySelector('.finish');
                    const result = document.querySelector('.finish-result');
                    finish.classList.add('visible');
                    result.innerHTML = this.result;

                    let rez = localStorage.getItem(`${startId / 10}record`);
                    // console.log('startId / 10 ', startId / 10);
                    // console.log('rez from local', rez);
                    if (rez!==undefined && rez < this.result || rez == null) {
                        localStorage.setItem(`${startId / 10}record`, this.result);
                    }
                    // console.log('STOP THIS', this.result);
                    // console.log(finish);
                    
                }
                id = id + 1;
                this.prototype.render(id, startId, json);
            }
        };

        async render(id = this.id, startId = this.startId, json = this.json) {
            document.body.innerHTML = document.body.innerHTML; // delete all event listeners
            let arrOfSound = document.querySelectorAll('.audio');
            arrOfSound.forEach((sound) => {
                sound.volume = +Utils.Settings.sound().volume;
                sound.muted =  Utils.Settings.sound().isMuted == 'true' ? true : false;
            });

            Utils.GamePictures.history = [];
            const imgArr = document.querySelectorAll('.question-img__pictures-game');
            let answerId = Utils.randomPictures(0,3);
            Utils.GamePictures.history.push(id);

            const quest = document.querySelector('.author__pictures-game');
            quest.innerHTML = json[id].author;
            // console.log('start ', startId);
            imgArr.forEach((answer, idx) => {
                if (idx == answerId) {
                    Utils.GamePictures.loadImg(answer, `https://raw.githubusercontent.com/timursk/image-data/master/img/${id}.webp`);
                    answer.addEventListener('click', () => Utils.GamePictures.answer(true, id, startId, json));
                } else {
                    let rand = Utils.randomPictures(startId, startId + 9, true);
                    Utils.GamePictures.history.push(rand);
                    Utils.GamePictures.loadImg(answer, `https://raw.githubusercontent.com/timursk/image-data/master/img/${rand}.webp`);
                    answer.addEventListener('click', () => Utils.GamePictures.answer(false, id, startId, json));
                }
            });
        }


    },
    Settings: class {
        constructor() {
            this.volume = 1;
            this.isTime = false;
            this.time = 0;
            this.default = {
                value: 100,
                timeGame: false,
                time: 20,
            }
        }
        static sound =  () => {return {
            volume: localStorage.getItem('volume'),
            isMuted: localStorage.getItem('isMuted'),
            timeGame: null,
            time: null,
    }};

        renderLocalStorage() {
            if (localStorage.getItem('volume')) {
                document.querySelector('.volume-range__settings').value = localStorage.getItem('volume') * 100;
                let audios = document.querySelectorAll('.audio');
                audios.forEach((sound) => {
                    sound.volume = localStorage.getItem('volume');
                });
            }

            if (localStorage.getItem('isMuted') !== undefined) {
                let isMuted = localStorage.getItem('isMuted');
                let audios = document.querySelectorAll('.audio');
                audios.forEach((sound) => {
                    sound.muted = isMuted ? true : false;
                    // console.log(sound.volume);
                });

                const imgOff = document.querySelector('.volume-imgs-off__settings');
                const imgOn = document.querySelector('.volume-imgs-on__settings');
                const input = document.querySelector('.volume-range__settings');

                if (isMuted == 'true') {
                    imgOn.style.filter = "none";
                    imgOff.style.filter = "invert(34%) sepia(88%) saturate(4311%) hue-rotate(203deg) brightness(102%) contrast(105%)";
                    input.disabled = true;
                } 

                if (isMuted == 'false') {
                    imgOn.style.filter = "invert(34%) sepia(88%) saturate(4311%) hue-rotate(203deg) brightness(102%) contrast(105%)";
                    imgOff.style.filter = "none";
                    input.disabled = false;
                }
            }


            // localStorage.getItem('timeGame');
            // localStorage.getItem('time');
        }
        addEvents() {
            const input = document.querySelector('.volume-range__settings');
            const imgOff = document.querySelector('.volume-imgs-off__settings');
            const imgOn = document.querySelector('.volume-imgs-on__settings');
            const timeIsOn = document.querySelector('.time-on-text__settings');
            const timeSwitch = document.querySelector('.time-on__settings');
            const timeText = document.querySelector('.time-text-now__settings');
            const timeMinus = document.querySelector('.time-answer-minus__settings');
            const timePlus = document.querySelector('.time-answer-plus__settings');
            const done = document.querySelector('.done');
            const error = document.querySelector('.error');
            const defaultSettings = document.querySelector('.buttons-default__settings');

            input.addEventListener('input', (ev) => this.playDone(ev, done));
            imgOff.addEventListener('click', () => this.soundOnOff(false, imgOff, imgOn));
            imgOn.addEventListener('click', () => this.soundOnOff(true, imgOn, imgOff));
            timeSwitch.addEventListener('click', () => this.switch(timeSwitch, timeIsOn));
            timeMinus.addEventListener('click', () => this.changeTime(false, timeText));
            timePlus.addEventListener('click', () => this.changeTime(true, timeText));
            defaultSettings.addEventListener('click', () => this.goDefault(input, timeIsOn, timeSwitch, timeText, imgOff, imgOn));

        }

        playDone(ev, done) {
            let audios = document.querySelectorAll('.audio');
            let vol = ev.srcElement.value;
            audios.forEach((audio) => {
                audio.volume = vol / 100;
                audio.muted = false;
            });
            localStorage.setItem('volume', vol / 100);
            console.log(done.muted);
            done.play();
        }

        soundOnOff(bool, img, imgToDel) {
            imgToDel.style.filter = "none";
            img.style.filter = "invert(34%) sepia(88%) saturate(4311%) hue-rotate(203deg) brightness(102%) contrast(105%)";
            let audios = document.querySelectorAll('.audio');
            const input = document.querySelector('.volume-range__settings');
            audios.forEach((sound) => {
                sound.muted = bool ? false : true;
            });
            input.disabled = bool ? false : true;
            console.log('sound is ', audios[0].muted);
            localStorage.setItem('isMuted', audios[0].muted);
        }

        switch(item, timeIsOn) {
            item.classList.toggle('clicked');
            timeIsOn.innerHTML = timeIsOn.innerHTML == 'Off' ? 'On' : 'Off';
            localStorage.setItem('timeGame', timeIsOn.innerHTML == 'Off' ? false : true);
        }

        changeTime(bool, timeText) {
            let num = +timeText.innerHTML;
            num += bool ? 1 : -1;
            timeText.innerHTML = num;
            localStorage.setItem('time', num);
        }

        goDefault(input, timeIsOn, timeSwitch, timeText, imgOff, imgOn) {
            input.value = this.default.value;
            input.disabled = false;
            timeIsOn.innerHTML = 'Off';
            timeSwitch.classList.remove('clicked');
            timeText.innerHTML = '20';
            imgOff.style.filter = "none";
            imgOn.style.filter = "none";

            let audios = document.querySelectorAll('.audio');
            audios.forEach((audio) => {
                audio.volume = 1;
                audio.muted = false;
            });
        }
    },
    setRecordsArtists() {
        const arr = document.querySelectorAll('.item-record__artists');
        arr.forEach((item, idx) => {
            // console.log(idx);
            if (localStorage.getItem(`${idx}record`)) {
                item.innerHTML = localStorage.getItem(`${idx}record`) + `/10`;
            }
        });
    },
    setRecordsPictures() {
        const arr = document.querySelectorAll('.item-record__pictures');
        arr.forEach((item, idx) => {
            idx = idx + 12;
            if (localStorage.getItem(`${idx}record`)) {
                item.innerHTML = localStorage.getItem(`${idx}record`) + `/10`;
            }
        });
    },
}

export default Utils;