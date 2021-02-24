import { app } from './app'
import { connectDB } from '../typeorm'

const startServer = async () => {
  await connectDB()

  app.listen('8080', () => console.log('Server running on 8080.'))
}

startServer()
