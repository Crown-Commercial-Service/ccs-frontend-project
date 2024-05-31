const { ports } = require('@ccs-frontend/config')

/**
 * @type {import('jest-dev-server').Config}
 */
module.exports = {
  command: 'npm start --workspace @ccs-frontend/review',
  port: ports.app,

  // Allow 30 seconds to start server
  launchTimeout: 30000,

  // Skip when already running
  usedPortAction: 'ignore'
}
