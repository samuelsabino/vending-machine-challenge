import { Joi } from 'celebrate'

import { ICoinToAddDTO } from '../../../dtos/coin.dto'

const coinsToAddSchema = Joi.array().items(
  Joi.object<ICoinToAddDTO>().keys({
    value: Joi.number().required(),
    quantity: Joi.number().required()
  }))

const calculateChangeSchema = Joi.object().keys({
  change: Joi.string().required(),
  availableCoins: coinsToAddSchema.optional().allow(null)
})

export { calculateChangeSchema, coinsToAddSchema }
