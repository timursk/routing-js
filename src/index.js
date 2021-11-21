import './styles/style.scss';


import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Artists } from './pages/Artists';
import { Pictures } from './pages/Pictures';

import Utils from './utils/Utils';

const homeInstance = new Home();
const settingsInstance = new Settings();
const artistsInstance = new Artists();
const picturesInstance = new Pictures();




const routes = {
    '/': homeInstance,
    '/settings': settingsInstance,
    '/artists': artistsInstance,
    '/pictures': picturesInstance,
    'artists/game': null,
    'pictures/game': null,
}
document.querySelector('header').innerHTML = await homeInstance.render();
const router = async () => {
    // const header = null || document.querySelector('header');
    // const main = null || document.querySelector('main');
    // const footer = null || document.querySelector('footer');

    const request = Utils.parseURL();
    const parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? `/${request.id}` : '');
    const page = routes[parsedURL] ? routes[parsedURL] : 'ERROR';
    document.body.innerHTML = await page.render();
    
    if (request.id != undefined) {
        const test = new Utils.Game(request.id); 
        test.render();
    }

}


window.addEventListener('hashchange', router);
window.addEventListener('load', router);
