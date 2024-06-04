# Crown Commercial Service (CCS) Frontend Project

Crown Commercial Service (CCS) Frontend contains the code you need to start building a user interface for CCS platforms and services.

## Quick start

### Install with npm (recommended)

You can follow the GOV.UK Frontend guide for setting this package up [using Node.js package manager (npm)](https://frontend.design-system.service.gov.uk/installing-with-npm/).
The only differences are that instead of `govuk-frontend` you want to install `ccs-frontend`.

## Importing styles

You need to import the CCS Frontend styles into the main Sass file in your
project. You should place the below code before your own Sass rules (or Sass
imports) if you want to override CCS Frontend with your own styles.

To import add the below to your Sass file:

```scss
@import "node_modules/ccs-frontend/dist/ccs/all";
```

You can see the GDS guidance for [more details on importing styles](https://frontend.design-system.service.gov.uk/importing-css-assets-and-javascript/#css)


## Importing JavaScript

Some of the JavaScript included in CCS Frontend improves the usability and
accessibility of the components. You should make sure that you are importing and
initialising JavaScript in your application. This will ensure all users can use it successfully.

You can include JavaScript for all components by copying both `ccs-frontend.min.js` and `ccs-frontend.min.js.map` from `node_modules/ccs-frontend/dist/ccs/` into your application and referencing the JavaScript directly:

```html
<script type="module" src="{path-to-javascript}/ccs-frontend.min.js"></script>
```

Next you need to import and initialise CCS Frontend by adding:

```html
<script type="module">
  import { initAll } from '{path-to-javascript}/ccs-frontend.min.js'
  initAll()
</script>
```

You can see the GDS guidance for [more details on importing JavaScript and advanced options](https://frontend.design-system.service.gov.uk/importing-css-assets-and-javascript/#javascript)

## Importing assets

In order to import CCS Frontend images to your project, you should configure your application to reference or copy the relevant CCS Frontend assets.

## Getting updates

To be notified when there’s a new release, you can either:

- [watch the govuk-frontend Github repository](https://help.github.com/en/articles/watching-and-unwatching-repositories)

Find out how to [update with npm](https://frontend.design-system.service.gov.uk/updating-with-npm/).

## Licence

Unless stated otherwise, the codebase is released under the MIT License. This
covers both the codebase and any sample code in the documentation. The
documentation is &copy; Crown copyright and available under the terms of the
Open Government 3.0 licence.
