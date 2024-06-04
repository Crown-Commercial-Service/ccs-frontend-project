Crown Commercial Service (CCS) Frontend Project

[![Build Status](https://github.com/tim-s-ccs/ccs-frontend-project/workflows/Tests/badge.svg)](https://github.com/tim-s-ccs/ccs-frontend-project/actions?query=workflow%3ATests+branch%3Amain)
[![Known Vulnerabilities](https://snyk.io/test/github/tim-s-ccs/ccs-frontend-project/badge.svg?targetFile=package.json)](https://snyk.io/test/github/tim-s-ccs/ccs-frontend-project/badge.svg?targetFile=package.json)
=====================

Crown Commercial Service (CCS) Frontend contains the code you need to start building a user interface for CCS platforms and services.

This project was inspired by/copied from the [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) project by the [GOV.UK Design System](https://design-system.service.gov.uk/) and we thank them for their work which has helped with this project.

## Quick start

You can follow the GOV.UK Frontend guide for setting this package up [using Node.js package manager (npm)](https://frontend.design-system.service.gov.uk/installing-with-npm/).
The only differences are that instead of `govuk-frontend` you want to install `ccs-frontend`.


## Browser and assistive technology support

To help manage the ever-growing number of browser versions, we group browsers into 4 grades:

- **grade A** - Most recent stable versions of Chrome, Firefox, Edge, Samsung Internet and Safari
- **grade B** - All stable versions of Chrome, Firefox and Edge released in the last 6 months and the last 4 major stable releases of Safari which are not supported in Grade A
- **grade C** - [All browsers that support `<script type="module">`](https://caniuse.com/es6-module) (Chrome 61+, Edge 16-18, Edge 79+, Firefox 60+, Safari 11+)
- **grade X** - All other browsers (including IE11 and older)

> **Note: Only browsers in grades A, B and C will run our JavaScript enhancements. We will not support our JavaScript enhancements for older browsers in grade X.**

For more information see [GOV.UK Frontend Browser Support documentation](https://github.com/alphagov/govuk-frontend/blob/main/docs/contributing/browser-support.md).

## Accessibility

The CCS Development team works to ensure that CCS Frontend is accessible to the same level as GOV.UK Frontend.

Using CCS and GOV.UK Frontend will help your service meet [level AA of WCAG 2.1](https://www.gov.uk/service-manual/helping-people-to-use-your-service/understanding-wcag). But you must still [check that your service meets accessibility requirements](https://www.gov.uk/service-manual/helping-people-to-use-your-service/making-your-service-accessible-an-introduction), especially if you extend or modify components.

## Security

CCS is an advocate of responsible vulnerability disclosure. If you’ve found a vulnerability, we would like to know so we can fix it.

For full details on how to tell us about vulnerabilities, [see our security policy](https://github.com/Crown-Commercial-Service/.github/blob/main/SECURITY.md).

## Licence

Unless stated otherwise, the codebase is released under the MIT License. This
covers both the codebase and any sample code in the documentation. The
documentation is &copy; Crown copyright and available under the terms of the
Open Government 3.0 licence.

## Contributing

CCS Frontend is maintained by a team at Crown Commercial Service.
