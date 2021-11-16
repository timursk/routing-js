'use strict';

import './styles/style.scss';

import { Home } from './pages/Home';

// Refactor
import { Categories } from './pages/Categories';
import { Settings } from './pages/Settings';
import { Error404 } from './pages/Error404';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Utils } from './utils/Utils';

const routes = {
  '/': Home,
  '/settings': Settings,
  '/categories': Categories,
};

const router = async () => {
  const header = null || document.getElementById('header_container');
  const content = null || document.getElementById('page_container');
  const footer = null || document.getElementById('footer_container');

  header.innerHTML = await new Header().render();
  await Header.after_render();

  footer.innerHTML = await new Footer().render();
  await Footer.after_render();

  const request = Utils.parseRequestURL();

  const parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');

  const page = routes[parsedURL] ? routes[parsedURL] : Error404;

  content.innerHTML = await new page().render();

  await new page().after_render();
};

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
