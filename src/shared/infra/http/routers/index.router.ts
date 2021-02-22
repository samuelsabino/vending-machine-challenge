import express from 'express'

import { coinRouter } from '../../../../modules/coins/infra/http/routers/coin.router'

const router = express.Router()

router.use('/coins', coinRouter)

export { router }
