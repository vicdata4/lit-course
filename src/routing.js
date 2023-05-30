import { Router } from '@vaadin/router';
import * as users from './profiles/profiles.json';

import './views/home-view';
import './views/form-validation-view';
import './views/not-found-view';
import './views/data-binding';
import './views/profiles-view';
import './views/searcher-view';
import './views/storybook-view';
import './views/extras-view';
import './views/extras-viewapi';
import './views/extras-view-syp';
import './profiles';

export const routing = (outlet) => {
  const router = new Router(outlet);

  var routes = [
    { path: '/', component: 'home-view' },
    { path: '/validation', component: 'form-validation-view' },
    { path: '/data-binding', component: 'data-binding' },
    { path: '/profiles', component: 'profiles-view' },
    { path: '/searcher', component: 'searcher-view' },
    { path: '/storybook', component: 'storybook-view' },
    { path: '/extras', component: 'extras-view' },
    { path: '/extras/api', component: 'extras-viewapi' },
    { path: '/extras/syp', component: 'extras-view-syp' },
    { path: '(.*)', component: 'not-found-view' },
  ];

  users.list.forEach((user) => {
    routes.unshift({ path: `/profiles/${user.toLowerCase()}`, component: `${user.toLowerCase()}-page` });
  });

  router.setRoutes(routes);
};
