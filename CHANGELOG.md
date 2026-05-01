# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Changed

- Removed the CCS branding now we have migrated the organisation to GCA

### Fixed

- Fixed issue where secondary and warning buttons would have the wrong shadow colour

## [3.1.1] - 2026-03-17

### Fixed

- Fixed issue with button colours due to changes in GOV.UK Frontend v6

## [3.1.0] - 2026-03-11

### Changed

- use a `div` for CCS Header rather than `header` to align with GOV.Uk Frontend v6
- use a `div` for CCS Footer rather than `footer` to align with GOV.Uk Frontend v6

## [3.0.0] - 2026-03-08

### Changed

- Updated GOV.UK Frontend to [v6.1.0](https://github.com/alphagov/govuk-frontend/releases/tag/v6.1.0)

### Removed

- Removed deprectaed `ccs/all.scss` and use `ccs/index.scss`

## [2.5.0] - 2026-01-30

### Added

- Add Government Commercial Agency (GCA) branding for the header and logo behind the `useGcaBranding` feature flag
- Add Government Commercial Agency (GCA) assets

## [2.4.0] - 2026-01-19

### Changed

- Updated GOV.UK Frontend to [v5.14.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.14.0)
- Updated jQuery to [v4.0.0](https://github.com/jquery/jquery/releases/tag/4.0.0)

## [2.3.0] - 2025-11-26

### Changed

- Update the footer to just use the crown and to put it in the bottom right

## [2.2.1] - 2025-11-25

### Fixed

- Fix some CSS issues

## [2.2.0] - 2025-11-25

### Changed

- Internal update to use NodeJS LTS Krypton (v24)
- Update the CCS Logo to include the linear version
- Update media queries to use new SCCS functions from GOV.UK Frontend

## [2.1.0] - 2025-10-13

### Changed

- Updated GOV.UK Frontend to [v5.13.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.13.0)

## [2.0.1] - 2025-08-27

### Fixed

- Fixed issue where the colour of the buttons did not come through correctly

## [2.0.0] - 2025-08-27

### Added

- Added overrides for GOV.UK Service Navigation to match new CCS brand colours

### Changed

- Change to the CCS branding from "professional claret" to "reassured cornflower blue"
- Add the new CCS branding colours to the CCS colour palette

### Removed

- With update to CCS branding remove all existing CCS colours, except black, from the CCS colour palette
- The CCS Header is now just the logo as all other parts should now go in the GOV.UK Service Navigation component

## [1.4.1] - 2025-05-12

### Changed

- Updated GOV.UK Frontend to [v5.10.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.0)

## [1.4.0] - 2025-04-17

### Added

- For Rails 7.2 we need to allow delete links to be buttons in the header so the header has been updated to accept a HTTP method and render a button in a form

## [1.3.3] - 2025-03-21

### Changed

- Updated GOV.UK Frontend to [v5.9.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.9.0)

## [1.3.2] - 2025-01-08

### Changed

- Fix the formatting of the CCS logo HTML

## [1.3.1] - 2025-01-07

### Changed

- Clean up the new CCS logo SVG

## [1.3.0] - 2025-01-07

### Changed

- Update the CCS logo with the latest CCS logo

## [1.2.0] - 2024-11-05

### Changed

- Internal update to use NodeJS LTS Jod (v22)

## [1.1.3] - 2024-09-02

### Changed

- Updated GOV.UK Frontend to [v5.6.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.6.0)

## [1.1.2] - 2024-08-12

### Changed

- Updated GOV.UK Frontend to [v5.5.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.5.0)

## [1.1.1] - 2024-07-14

### Changed

- Updated GOV.UK Frontend to [v5.4.1](https://github.com/alphagov/govuk-frontend/releases/tag/v5.4.1)

## [1.1.0] - 2024-06-28

### Added

- The following CCS helpers have been added:
  - Contact us
  - Password Strength

- Add a type declaration files

## [1.0.0] - 2024-06-07

### Added

- Initial release of CCS Frontend.
  This release contains assets and templates to create CCS components.

- The following CCS helpers have been added:
  - Dashboard Section
  - Footer
  - Header
  - Logo
