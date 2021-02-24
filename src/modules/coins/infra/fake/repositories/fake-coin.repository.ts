import { ICoinToAddDTO } from 'modules/coins/dtos/coin.dto'

import { ICoinRepository } from '../../../interfaces/coin.interface'
import { Coin } from '../../typeorm/entities/coin.entity'

class FakeCoinRepository implements ICoinRepository {
  private coins: Coin[] = []

  async updateQuantityCoin (coinToUpdate: Coin): Promise<Coin> {
    let coinUpdated: Coin | undefined

    for (const coin of this.coins) {
      if (coin.value !== coinToUpdate.value) continue

      coin.quantity = coin.quantity + coinToUpdate.quantity

      coinUpdated = coin
    }

    if (!coinUpdated) this.coins.push(coinToUpdate)

    return coinUpdated ?? coinToUpdate
  }

  async checkQuantityCoin (): Promise<Coin[]> {
    return this.coins
  }

  async findByValue (value: number): Promise<Coin | undefined> {
    const foundCoin = this.coins.find((coin) => coin.value === value)

    return foundCoin
  }

  async addCoin (coins: ICoinToAddDTO[]): Promise<Coin[]> {
    for (const coin of coins) {
      this.coins.push(coin)
    }

    return coins
  }

  async deleteAll (): Promise<Coin[]> {
    this.coins = []

    return this.coins
  }
}

export { FakeCoinRepository }
