# Testing and linting

GitHub Actions lints Sass and JavaScript, runs unit and functional tests with Node.js.

See the [GitHub Actions **Tests** workflow](https://github.com/tim-s-ccs/ccs-frontend-project/actions/workflows/tests.yml) for more information.

## Testing terminology

We use different types of tests to check different areas of our code are working as expected.

Unit tests are small, modular tests that verify a "unit" of code. We write unit tests to check our JavaScript logic, particularly 'background logic' that does not heavily rely on [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) interaction (where functional tests may be better suited).

Functional tests verify the output of an action and do not check the intermediate states of the system when performing that action. We write functional tests to check component interactions have the expected results, so we also refer to these as component tests. We also write functional tests to check that our Nunjucks code outputs expected HTML, and we refer to these as our Nunjucks tests.

## Running linting and tests

### Running all tests locally

To test the whole codebase, run:

```shell
npm test
```

This will compile JavaScript and Sass, including documentation, then trigger [Jest](https://github.com/facebook/jest) for our testing.

See [Tasks](../contributing/tasks.md) for details of what `npm test` does.

### Running individual tests

You can run a subset of the test suite that only tests components by running:

```shell
npx jest packages/ccs-frontend/src/govuk/components/header
```

Note: There's a watch mode that keeps a testing session open waiting for changes that can be used with:

```shell
npx jest --watch packages/ccs-frontend/src/ccs/components/header
```

### Running all linting checks locally

To lint the whole codebase, run:

```shell
npm run lint
```

This will run the following checks:

1. [ESLint](https://eslint.org) (using [JavaScript Standard Style](https://standardjs.com))
2. [Stylelint](https://stylelint.io) (using [GDS Stylelint Config](https://github.com/alphagov/stylelint-config-gds))

To commit changes without automatic checks use `git commit --no-verify`.

### Running only Sass linting

```shell
npm run lint:scss
```

### Running only JavaScript linting

```shell
npm run lint:js
```

## Unit and functional tests with Node.js

We use [Jest](https://jestjs.io/), an automated testing platform with an assertion library, and [Puppeteer](https://pptr.dev/) that is used to control [headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome).

Tests should be written using ES modules (`*.mjs`) by default, but use CommonJS modules (`*.js`) for tests using browser [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) in Puppeteer. This avoids Babel transforms until [Jest supports `import()` and ES modules](https://jestjs.io/docs/ecmascript-modules) in future.

### Component tests

We write functional tests for every component to check the output of our Nunjucks code. These are found in `template.test.js` files in each component directory. These Nunjucks tests render the component examples defined in the component yaml files, and assert that the HTML tags, attributes and classes are as expected. For example: checking that when you pass in an `id` to the component using the Nunjucks macro, it outputs the component with an `id` attribute equal to that value.

If a component uses JavaScript, we also write functional tests in a `[component name].test.js` file, for example [header.test.js](/packages/ccs-frontend/src/ccs/components/header/header.test.js). These component tests check that interactions, such as a mouse click, have the expected result.

If you want to inspect a test that's running in the browser, configure Jest Puppeteer in non-headless mode with the environment variable `HEADLESS=false` and then use [Jest Puppeteer's debug mode](https://github.com/argos-ci/jest-puppeteer/blob/main/README.md#debug-mode) to pause the test execution.

```shell
HEADLESS=false npx jest --watch src/ccs/components/footer/accessibility.test.mjs
```

You should also test component Javascript logic with unit tests, in a `[component name].unit.test.mjs` file. These tests are better suited for testing behind-the-scenes logic, or in cases where the final output of some logic is not a change to the component markup.

### Conventions

We aim to write the test descriptions in everyday language. For example, "footer component fails to render if the required fields are not included".

Keep all tests separate from each other. It should not matter the order or amount of tests you run from a test suite.

Try and keep assertions small, so each test only checks for one thing. This makes tests more readable and makes it easier to see what's happening if a test is failing.

## Updating component snapshots

For components, the snapshots are stored in `[component-name directory]/_snapshots_`.

If a snapshot test fails, review the difference in the console. If the change is the correct change to make, run:

```shell
npm test -- -u packages/ccs-frontend/src/ccs/components/dashboard-section
```

This will update the snapshot file. Commit this file separately with a commit message that explains you're updating the snapshot file and an explanation of what caused the change.
