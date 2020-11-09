import { Router } from '@vaadin/router';
import * as users from './works/users';

import './views/home-view';
import './views/form-example-view';
import './views/not-found-view';
import './views/data-binding';
import './views/list-example-view';
import './views/works-view';
import './views/pagination-view';
import './views/searcher-view';
import './views/calendar-view';
import './works';

export const routing = (outlet) => {
  const router = new Router(outlet);

  var routes = [
    { path: '/', component: 'home-view' },
    { path: '/form-example-view', component: 'form-example-view' },
    { path: '/data-binding', component: 'data-binding' },
    { path: '/list-example', component: 'list-example-view' },
    { path: '/works', component: 'works-view' },
    { path: '/pagination', component: 'pagination-view' },
    { path: '/searcher', component: 'searcher-view' },
    { path: '/calendar', component: 'calendar-view' },
    { path: '(.*)', component: 'not-found-view' },
  ];

  users.list.forEach((user) => {
    routes.unshift({ path: `/${user.toLowerCase()}`, component: `${user.toLowerCase()}-page` });
  });

  router.setRoutes(routes);
};
