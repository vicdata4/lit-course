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

import './works/alba1709/alba1709-home';
import './works/andresclase1234/andresclase1234-home';
import './works/antoniomaracil/antoniomaracil-home';
import './works/appservidor/appservidor-home';
import './works/calaverosa/calaverosa-home';
import './works/efim93/efim93-home';
import './works/ikeyvin/ikeyvin-home';
import './works/hck3791/hck3791-home';
import './works/jhumekes/jhumekes-home';
import './works/julieannecodes/julieannecodes-home';
import './works/xbeni/xbeni-home';
import './works/vicdata4/vicdata4-home';

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
    { path: '(.*)', component: 'not-found-view' }
  ];

  users.forEach(user => {
    routes.unshift({ path: `/${user.toLowerCase()}`, component: `${user.toLowerCase()}-home` });
  });

  router.setRoutes(routes);
};
