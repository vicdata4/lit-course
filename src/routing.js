import { Router } from '@vaadin/router';
import * as users from './profiles/profiles.json';

import './views/home-view';
import './views/form-validation-view';
import './views/not-found-view';
import './views/data-binding';
import './views/profiles-view';
import './views/searcher-view';
import './views/storybook-view';
import './profiles';

export const routing = (outlet) => {
  const router = new Router(outlet);

  var routes = [
    {
      path: '/lit-course/',
      children: [
        { path: '/', component: 'home-view' },
        { path: '/validation', component: 'form-validation-view' },
        { path: '/data-binding', component: 'data-binding' },
        { path: '/profiles', component: 'profiles-view' },
        { path: '/searcher', component: 'searcher-view' },
        { path: '/storybook', component: 'storybook-view' },
        { path: '(.*)', component: 'not-found-view' },
      ],
    },
  ];

  users.list.forEach((user) => {
    routes.unshift({ path: `/profiles/${user.toLowerCase()}`, component: `${user.toLowerCase()}-page` });
  });

  router.setRoutes(routes);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  if (urlParams.get('v')) {
    window.dispatchEvent(
      new CustomEvent('vaadin-router-go', {
        detail: {
          pathname: '/lit-course/' + urlParams.get('v'),
        },
      }),
    );
  }
};
