![](https://cdn.jsdelivr.net/gh/vicdata4/lit-course/assets/images/logo_.png?v=4&s=100)

## Dependencies
- [Rollup.js](https://rollupjs.org) Module bundler
- [LitElement](https://lit-element.polymer-project.org) Web Components
- [LitHtml](https://lit-html.polymer-project.org) HTML templating library
- [Karma](https://karma-runner.github.io/) Test runner
- [Mocha](https://mochajs.org/) Test framework
- [Chai](https://www.chaijs.com/) Assertion library
- [Vaadin](https://www.npmjs.com/package/@vaadin/router) Routing
- [Redux](https://redux.js.org/) State Container
- [ESLint](https://eslint.org) Linter tool
- [Prettier](https://prettier.io/) Code formatter
- [Husky](https://www.npmjs.com/package/husky) Pre commit/push Hooks
- [CommitLint](https://commitlint.js.org/) Commit convention
- [Storybook](https://storybook.js.org/) UI components tool


## Quick start

Run from command line

```bash
git clone https://github.com/vicdata4/lit-course

cd lit-course
```

Install dependencies
```bash
npm install
```

Run application

```bash
npm run dev
```

Conventional commits

[More info](https://www.conventionalcommits.org/en/v1.0.0/)

```bash
fix: some message
```
```bash
fix(scope): some message
```
\
[Unit Tests](https://github.com/vicdata4/lit-course/tree/master/tests)


```bash
npm run test
```

ESLint 
- [ESLint Config](https://github.com/vicdata4/lit-course/tree/master/.eslintrc.js)
- [Prettier Config](https://github.com/vicdata4/lit-course/tree/master/.prettierrc)

```bash
npm run lint
```
```bash
npm run lint:fix
```

Storybook

- [Configuration](https://github.com/vicdata4/lit-course/tree/master/.storybook)
- [Stories](https://github.com/vicdata4/lit-course/tree/master/stories)

```bash
npm run storybook
```
