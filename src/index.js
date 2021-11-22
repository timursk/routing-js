import './styles/style.scss';


import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Artists } from './pages/Artists';
import { ArtistsGame } from './pages/ArtistsGame';
import { Pictures } from './pages/Pictures';
import { PicturesGame } from './pages/PicturesGame';

import Utils from './utils/Utils';

const homeInstance = new Home();
const settingsInstance = new Settings();
const artistsInstance = new Artists();
const artistsGameInstance = new ArtistsGame();
const picturesInstance = new Pictures();
const PicturesGameInstance = new PicturesGame();



const routes = {
    '/': homeInstance,
    '/settings': settingsInstance,
    '/artists': artistsInstance,
    '/pictures': picturesInstance,
    '/artists/game': artistsGameInstance,
    '/pictures/game': PicturesGameInstance,
}
document.querySelector('header').innerHTML = await homeInstance.render();
const router = async () => {
    // const header = null || document.querySelector('header');
    // const main = null || document.querySelector('main');
    // const footer = null || document.querySelector('footer');

    const request = Utils.parseURL();
    const parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? `/${request.id}` : '');
    console.log(parsedURL);
    const page = routes[parsedURL] ? routes[parsedURL] : 'ERROR';
    console.log(page);
    document.body.innerHTML = await page.render();
    
    if (request.id != undefined) {
        const test = new Utils.Game(request.id); 
        test.render();
    }

}


window.addEventListener('hashchange', router);
window.addEventListener('load', router);
