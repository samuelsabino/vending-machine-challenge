import { ICoinToAddDTO } from 'modules/coins/dtos/coin-to-add.dto'

import { ICoinRepository } from '../../../interfaces/coin.interface'
import { FakeCoin } from '../entities/fake-coin.entity'

class FakeCoinRepository implements ICoinRepository {
  private coins: FakeCoin[] = []

  async updateQuantityCoin (coinToUpdate: FakeCoin): Promise<FakeCoin> {
    let coinUpdated: FakeCoin | undefined

    for (const coin of this.coins) {
      if (coin.value !== coinToUpdate.value) continue

      coin.quantity = coin.quantity + coinToUpdate.quantity

      coinUpdated = coin
    }

    if (!coinUpdated) this.coins.push(coinToUpdate)

    return coinUpdated ?? coinToUpdate
  }

  async checkQuantityCoin (): Promise<FakeCoin[]> {
    return this.coins
  }

  async findByValue (value: number): Promise<FakeCoin | undefined> {
    const foundCoin = this.coins.find((coin) => coin.value === value)

    return foundCoin
  }

  async addCoin (coins: ICoinToAddDTO[]): Promise<FakeCoin[]> {
    for (const coin of coins) {
      this.coins.push(coin)
    }

    return coins
  }

  async deleteAll (): Promise<FakeCoin[]> {
    this.coins = []

    return this.coins
  }
}

export { FakeCoinRepository }
