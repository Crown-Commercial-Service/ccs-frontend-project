import { components, task } from '@ccs-frontend/tasks'
import gulp from 'gulp'

/**
 * Component fixtures and macro options (for watch)
 */
export const compile = (options) =>
  gulp.series(
    /**
     * Generate CCS Frontend fixtures.json from ${componentName}.yaml
     */
    task.name('compile:fixtures', () =>
      components.generateFixtures('**/*.yaml', options)
    ),

    /**
     * Generate CCS Frontend macro-options.json from ${componentName}.yaml
     */
    task.name('compile:macro-options', () =>
      components.generateMacroOptions('**/*.yaml', options)
    )
  )
