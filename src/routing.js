import { Router } from '@vaadin/router';

import './views/home-view';
import './views/form-one-view';
import './views/form-two-view';
import './views/form-three-view';
import './views/form-example-view';
import './views/not-found-view';

export const routing = function() {
  const outlet = this.shadowRoot.getElementById('root');
  const router = new Router(outlet);

  var routes = [
    { path: '/', component: 'home-view' },
    { path: '/form-one-view', component: 'form-one-view' },
    { path: '/form-two-view', component: 'form-two-view' },
    { path: '/form-three-view', component: 'form-three-view' },
    { path: '/form-example-view', component: 'form-example-view' },
    { path: '(.*)', component: 'not-found-view' }
  ];

  router.setRoutes(routes);
};
