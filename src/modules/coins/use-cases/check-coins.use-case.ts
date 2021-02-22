import { ICoinRepository } from '../interfaces/coin.interface'
import { formatMonetaryDescription } from '../services/util.service'

class CheckCoinsUseCase {
  constructor (private coinRepository: ICoinRepository) { /** */ }

  async execute (): Promise<string[]> {
    const result = await this.coinRepository.checkQuantityCoin()

    const formattedCoins = result.map((coin) => (formatMonetaryDescription(coin.value, coin.quantity)))

    return formattedCoins
  }
}

export { CheckCoinsUseCase }
