import { Router } from '@vaadin/router';

import './views/home-view';
import './views/form-example-view';
import './views/not-found-view';
import './views/data-binding';
import './views/list-example-view';
import './views/pagination-view';
import './views/searcher-view';
import './views/calendar-view';

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

  router.setRoutes(routes);
};
