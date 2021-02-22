import { Request, Response } from 'express'

import { CheckCoinsUseCase } from '../../../use-cases/check-coins.use-case'

import { CalculateChangeService } from '../../../use-cases/calculate-change.use-case'
import { CoinRepository } from '../../typeorm/repositories/coin.repository'

class CoinController {
  constructor () { /** */ }

  public async calculateAndShow (_req: Request, res: Response): Promise<void> {
    const coinRepository = new CoinRepository()
    const calculateChangeService = new CalculateChangeService(coinRepository)

    const result = await calculateChangeService.execute()

    res.status(200).json({ result })
  }

  public async findAndShow (_req: Request, res: Response): Promise<void> {
    const coinRepository = new CoinRepository()
    const checkcoinService = new CheckCoinsUseCase(coinRepository)

    const result = await checkcoinService.execute()

    res.status(200).json({ result })
  }
}

export { CoinController }
