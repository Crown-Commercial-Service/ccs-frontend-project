import { ports, urls } from '@ccs-frontend/config'

import app from './app.mjs'

const server = await app()

server.listen(ports.app, () => {
  console.log(`Server started at ${urls.app}`)
})
