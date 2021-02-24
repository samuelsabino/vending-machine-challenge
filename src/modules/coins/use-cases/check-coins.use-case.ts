import { ICoinRepository } from '../interfaces/coin.interface'
import { FormatService } from '../services/format.service'

class CheckCoinsUseCase {
  constructor (
    private coinRepository: ICoinRepository,
    private formatService = new FormatService()
  ) { /** */ }

  async execute (): Promise<string[]> {
    const coins = await this.coinRepository.checkQuantityCoin()

    const formattedCoins = coins.map((coin) => (this.formatService.formatMonetaryDescription(coin.value, coin.quantity)))

    return formattedCoins
  }
}

export { CheckCoinsUseCase }
