import { Router } from '@vaadin/router';

import './views/home-view';
import './views/paris-view';
import './views/dublin-view';
import './views/form-example-view';
import './views/not-found-view';
import './views/data-binding';
import './views/list-example-view';
import './views/solicitud-vacaciones';

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
    { path: '/solicitud-vacaciones', component: 'solicitud-vacaciones' },
    { path: '(.*)', component: 'not-found-view' }
  ];

  router.setRoutes(routes);
};
