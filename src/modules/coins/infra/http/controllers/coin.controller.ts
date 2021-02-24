import { Request, Response } from 'express'

import { ICoinToAddDTO } from '../../../dtos/coin.dto'

import { AddCoinsUseCase } from '../../../use-cases/add-coins.use-case'
import { CalculateChangeUseCase } from '../../../use-cases/calculate-change.use-case'
import { CheckCoinsUseCase } from '../../../use-cases/check-coins.use-case'
import { DeleteAllUseCase } from '../../../use-cases/delete-all.use-case'
import { CoinRepository } from '../../typeorm/repositories/coin.repository'

class CoinController {
  constructor () { /** */ }

  public async calculateAndShow (req: Request, res: Response): Promise<void> {
    const { change, availableCoins }: { change: string, availableCoins: ICoinToAddDTO[] } = req.body

    const coinRepository = new CoinRepository()
    const calculateChangeService = new CalculateChangeUseCase(coinRepository)

    const result = await calculateChangeService.execute(change, availableCoins)

    res.status(200).json({ result })
  }

  public async findAndShow (_req: Request, res: Response): Promise<void> {
    const coinRepository = new CoinRepository()
    const checkcoinService = new CheckCoinsUseCase(coinRepository)

    const result = await checkcoinService.execute()

    res.status(200).json({ result })
  }

  public async addCoins (req: Request, res: Response): Promise<void> {
    const coins: ICoinToAddDTO[] = req.body.availableCoins

    const coinRepository = new CoinRepository()
    const addCoinsUseCase = new AddCoinsUseCase(coinRepository)

    const result = await addCoinsUseCase.execute(coins)

    res.status(200).json({ result })
  }

  public async deleteAllItens (_req: Request, res: Response): Promise<void> {
    const coinRepository = new CoinRepository()
    const deleteAllUseCase = new DeleteAllUseCase(coinRepository)

    const result = await deleteAllUseCase.execute()

    res.status(200).json({ result })
  }
}

export { CoinController }
