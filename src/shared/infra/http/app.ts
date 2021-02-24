/* eslint-disable @typescript-eslint/no-unused-vars */
import 'express-async-errors'
import 'reflect-metadata'

import { isCelebrateError } from 'celebrate'
import express, { NextFunction, Request, Response } from 'express'

import { AppError } from '../../errors/app.error'
import { router } from './routers/index.router'

const app = express()

app.use(express.json())

app.use(router)

app.use((err: Error, _request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ name: err.name, message: err.message })
  }

  // Celebrate errors
  if (isCelebrateError(err)) {
    const queryMessage = err.details.get('query')?.message
    const bodyMessage = err.details.get('body')?.message

    console.log(err)

    return response.status(401).json({
      name: err.name,
      message: queryMessage || bodyMessage
    })
  }

  console.log(err)

  return response.status(500).json({ status: 'error', message: 'Erro interno do servidor.' })
})

export { app }
