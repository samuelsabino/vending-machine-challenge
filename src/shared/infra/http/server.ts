import { app } from './app'

const startServer = async () => {
  app.listen('8080', () => console.log('Server running on 8080.'))
}

startServer()
