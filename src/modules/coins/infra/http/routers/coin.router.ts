import { celebrate, Segments } from 'celebrate'
import { Router } from 'express'

import { CoinController } from '../controllers/coin.controller'
import { calculateChangeSchema, coinsToAddSchema } from '../schemas/coin.schema'

const coinRouter = Router()

const coinController = new CoinController()

coinRouter.get('/', (req, res) => coinController.findAndShow(req, res))

coinRouter.post('/', celebrate({ [Segments.BODY]: calculateChangeSchema }), (req, res) => coinController.calculateAndShow(req, res))

coinRouter.post('/add/', celebrate({ [Segments.BODY]: { availableCoins: coinsToAddSchema } }), (req, res) => coinController.addCoins(req, res))

coinRouter.delete('/', (req, res) => coinController.deleteAllItens(req, res))

export { coinRouter }
