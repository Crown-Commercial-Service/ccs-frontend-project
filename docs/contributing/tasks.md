# npm and Gulp tasks

This document describes the npm scripts that run the Express.js review app, and the Gulp tasks they trigger to build files, update the package, copy assets and watch for changes.

To run the Express.js review app without any tasks being triggered, see [Review app only](#review-app-only).

## npm script aliases

npm scripts are defined in `package.json`. These trigger a number of Gulp tasks.

**`npm start` will trigger `npm run dev` that will:**

- runs `npm run build`
- starts the review app, restarting when `.mjs`, `.json` or `.yaml` files change
- compile again when frontend `.mjs` and `.scss` files change

**`npm test` will do the following:**

- run Nunjucks macros tests
- run JavaScript tests on the review app
- run accessibility and HTML validation tests

**`npm run build` will do the following:**

- run tasks from `npm run build:package`
- run tasks from `npm run build:app`

**`npm run clean` will do the following:**

- clean the `./dist` folder from all workspaces

**`npm run build:app` will trigger `npm run build --workspace @ccs-frontend/review` that will:**

- clean the `./packages/ccs-frontend-review/dist` folder
- output files into `./packages/ccs-frontend-review/dist`
- copy fonts and images
- compile JavaScript and Sass, including documentation

**`npm run build:package` will do the following:**

- clean the `./packages/ccs-frontend/dist` folder
- output files into `./packages/ccs-frontend/dist`
- copy Sass files, applying Autoprefixer via PostCSS
- copy Nunjucks component template/macro files, including JSON configs
- compile Sass to CSS
- compile JavaScript to ECMAScript (ES) modules
- compile JavaScript to Universal Module Definition (UMD) bundles
- runs `npm run postbuild:package` (which will test the output is correct)

**`npm run build:release` will do the following:**

- clean the `./dist` folder
- output files into `./dist`
- copy fonts and images
- compile JavaScript and Sass
- append version number from `packages/ccs-frontend/package.json` to compiled JavaScript and CSS files
- runs `npm run postbuild:release` (which will test the output is correct)

## Gulp tasks

Project Gulp tasks are defined in [`gulpfile.mjs`](/gulpfile.mjs) and the [`tasks/`](/shared/tasks) folder.

Gulp tasks from npm workspaces (such as the review app) can be run as shown:

**`npx --workspace @ccs-frontend/review -- gulp --tasks`**

This will list out all available tasks for the review app.

CCS Frontend package build Gulp tasks are defined in [`packages/ccs-frontend/gulpfile.mjs`](/packages/ccs-frontend/gulpfile.mjs) and the [`packages/ccs-frontend/tasks/`](/packages/ccs-frontend/tasks) folder.

**`npx --workspace ccs-frontend -- gulp --tasks`**

This will list out all available tasks for the CCS Frontend package.

Review app Gulp tasks are defined in [`packages/ccs-frontend-review/gulpfile.mjs`](/packages/ccs-frontend-review/gulpfile.mjs) and the [`packages/ccs-frontend-review/tasks/`](/packages/ccs-frontend-review/tasks) folder.

**`npx --workspace @ccs-frontend/review -- gulp scripts`**

This task will:

- check JavaScript code quality via ESLint (`npm run lint:js`) (using JavaScript Standard Style)
- bundle JavaScript using Rollup into `./packages/ccs-frontend-review/dist/javascripts`

**`npx --workspace @ccs-frontend/review -- gulp styles`**

This task will:

- check Sass code quality via Stylelint (`npm run lint:scss`)
- compile Sass to CSS into `./packages/ccs-frontend-review/dist/stylesheets`

## Review app only

After building the project with `npm run build` the Express.js review app can be started with `npm start --workspace @ccs-frontend/review`. This prevents the Gulp tasks triggered by `npm start` from running.
