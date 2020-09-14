import { addParameters, configure } from '@storybook/polymer';
import { themes } from '@storybook/theming';
import '@storybook/addon-console';

addParameters({
    options: {
        /**
         * show story component as full screen
         * @type {Boolean}
         */
        isFullscreen: false,
        /**
         * display panel that shows a list of stories
         * @type {Boolean}
         */
        showNav: true,
        /**
         * display panel that shows addon configurations
         * @type {Boolean}
         */
        showPanel: false,
        /**
         * where to show the addon panel
         * @type {('bottom'|'right')}
         */
        panelPosition: 'right',
        /**
         * regex for finding the hierarchy separator
         * @example:
         *   null - turn off hierarchy
         *   /\// - split by `/`
         *   /\./ - split by `.`
         *   /\/|\./ - split by `/` or `.`
         * @type {Regex}
         */
        hierarchySeparator: /\/|\./,
        /**
         * regex for finding the hierarchy root separator
         * @example:
         *   null - turn off multiple hierarchy roots
         *   /\|/ - split by `|`
         * @type {Regex}
         */
        hierarchyRootSeparator: /\|/,
        /**
         * sidebar tree animations
         * @type {Boolean}
         */
        sidebarAnimations: true,
        /**
         * enable/disable shortcuts
         * @type {Boolean}
         */
        enableShortcuts: true,
        /**
         * show/hide tool bar
         * @type {Boolean}
         */
        isToolshown: false,
        /**
         * theme storybook, see link below
         */
        theme: themes.dark,
    },
});

const req = require.context('../stories', true, /\.stories\.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);