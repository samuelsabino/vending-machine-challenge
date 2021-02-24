import { getConnectionOptions, createConnection } from 'typeorm'

const connectDB = async (): Promise<void> => {
  const options = await getConnectionOptions()

  createConnection(options)
    .then(() => {
      console.log('Banco de dados iniciado com sucesso')
    })
}

export { connectDB }
