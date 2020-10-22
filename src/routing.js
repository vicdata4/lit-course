import { Router } from '@vaadin/router';
import { users } from './utils/constants';

import './views/home-view';
import './views/paris-view';
import './views/dublin-view';
import './views/form-example-view';
import './views/not-found-view';
import './views/data-binding';
import './views/list-example-view';
import './views/works-view';
import './views/pagination-view';
import './views/news-view';

import './works/alba1709/alba1709-page';
import './works/andresclase1234/andresclase1234-page';
import './works/antoniomaracil/antoniomaracil-page';
import './works/calaverosa/calaverosa-page';
import './works/efim93/efim93-page';
import './works/ikeyvin/ikeyvin-page';
import './works/hck3791/hck3791-page';
import './works/jhumekes/jhumekes-page';
import './works/julieannecodes/julieannecodes-page';
import './works/xbeni/xbeni-page';
import './works/vicdata4/vicdata4-page';

export const routing = function() {
  const outlet = this.shadowRoot.getElementById('root');
  const router = new Router(outlet);

  var routes = [
    { path: '/', component: 'home-view' },
    { path: '/paris-view', component: 'paris-view' },
    { path: '/dublin-view', component: 'dublin-view' },
    { path: '/form-example-view', component: 'form-example-view' },
    { path: '/data-binding', component: 'data-binding' },
    { path: '/list-example', component: 'list-example-view' },
    { path: '/works', component: 'works-view' },
    { path: '/pagination', component: 'pagination-view' },
    { path: '/news-searcher', component: 'news-view' },
    { path: '(.*)', component: 'not-found-view' }
  ];
  // hola
  users.forEach(user => {
    routes.unshift({ path: `/${user.toLowerCase()}`, component: `${user.toLowerCase()}-page` });
  });

  router.setRoutes(routes);
};
