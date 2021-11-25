import './styles/style.scss';


import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Artists } from './pages/Artists';
import { ArtistsGame } from './pages/ArtistsGame';
import { Pictures } from './pages/Pictures';
import { PicturesGame } from './pages/PicturesGame';
import { Error } from './pages/Error';

import Utils from './utils/Utils';
import images from './utils/images.json';
import Game from './utils/Game';
import GameArtists from './utils/GameArtists';

const homeInstance = new Home();
const settingsInstance = new Settings();
const artistsInstance = new Artists();
const artistsGameInstance = new ArtistsGame();
const picturesInstance = new Pictures();
const PicturesGameInstance = new PicturesGame();
const errorInstance = new Error();

async function loadJSON() {
    const jsonStr = JSON.stringify(images);
    const json = JSON.parse(jsonStr);
    return json;
}
let imagesInfo = await loadJSON();


const routes = {
    '/': homeInstance,
    '/settings': settingsInstance,
    '/artists': artistsInstance,
    '/pictures': picturesInstance,
    '/artists/game': artistsGameInstance,
    '/pictures/game': PicturesGameInstance,
    'ERROR': errorInstance,
}
document.querySelector('header').innerHTML = await homeInstance.render();
const router = async () => {
    const request = Utils.parseURL();
    const parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? `/game` : '');
    
    const page = routes[parsedURL] ? routes[parsedURL] : routes['ERROR'];
    document.body.innerHTML = await page.render();
    
    // game render
    if (request.id != undefined) {
        if (request.resource == 'artists') {
            // const game = new Utils.Game(request.id, imagesInfo); 
            // Utils.Game.result = 0;
            // await game.render();
            const game = new GameArtists(request.id, imagesInfo);
            game.startGame();
        } else if (request.resource == 'pictures') {
            const game = new Utils.GamePictures(+request.id, imagesInfo); 
            Utils.GamePictures.result = 0;
            await game.render();
        }
    }
    // settings render
    if (parsedURL == '/settings') {
        const settings = new Utils.Settings();
        settings.renderLocalStorage();
        settings.addEvents();
    }

    //artists record
    if (parsedURL == '/artists') {
        Utils.setRecordsArtists();
    }

    //pictures record 
    if (parsedURL == '/pictures') {
        Utils.setRecordsPictures();
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
