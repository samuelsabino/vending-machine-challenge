import { ICoinToAddDTO } from '../dtos/coin-to-add.dto'
import { ICoinRepository } from '../interfaces/coin.interface'
import { UtilService } from '../services/util.service'

class AddCoinsUseCase {
  constructor (
    private coinRepository: ICoinRepository,
    private utilService = new UtilService()
  ) { /** */ }

  async execute (coinsToSave: ICoinToAddDTO[]) {
    const coins = await this.utilService.addCoinsOnDatabase(coinsToSave, this.coinRepository)

    return coins
  }
}

export { AddCoinsUseCase }
