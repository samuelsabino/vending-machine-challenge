import { ICoinToAddDTO } from '../../../modules/coins/dtos/coin.dto'

import { Coin } from '../infra/typeorm/entities/coin.entity'
import { ICoinRepository } from '../interfaces/coin.interface'

class UtilService {
  async updateQuantityCoinsOnDatabase (quantityCoins: { [key: string]: number }, coins: Coin[], coinRepository: ICoinRepository) {
    for (const coin of coins) {
      if (quantityCoins[coin.value] === 0) continue

      const coinToUpdate = JSON.parse(JSON.stringify(coin)) as Coin

      coinToUpdate.quantity = coinToUpdate.quantity - quantityCoins[coinToUpdate.value]

      await coinRepository.updateQuantityCoin(coinToUpdate)
    }
  }

  async addCoinsOnDatabase (coinsToSave: ICoinToAddDTO[], coinRepository: ICoinRepository) {
    const coins: Coin[] = []

    for (const coin in coinsToSave) {
      const foundCoin = await coinRepository.findByValue(coinsToSave[coin].value)

      if (!foundCoin) {
        const savedCoin = await coinRepository.addCoin([coinsToSave[coin]])

        coins.push(...savedCoin)

        continue
      }

      foundCoin.quantity = foundCoin.quantity + coinsToSave[coin].quantity

      const updatedCoin = await coinRepository.updateQuantityCoin(foundCoin)

      coins.push(updatedCoin)
    }

    return coins
  }
}

export { UtilService }
