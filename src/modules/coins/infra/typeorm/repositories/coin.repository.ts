import { ICoinToAddDTO } from 'modules/coins/dtos/coin-to-add.dto'
import { getConnection, getRepository } from 'typeorm'

import { ICoinRepository } from '../../../../../modules/coins/interfaces/coin.interface'
import { Coin } from '../entities/coin.entity'

class CoinRepository implements ICoinRepository {
  constructor (private coinRepository = getRepository(Coin)) { /** */ }

  async updateQuantityCoin (coin: Coin): Promise<Coin> {
    await this.coinRepository
      .createQueryBuilder().update('coins')
      .set({ quantity: coin.quantity })
      .where('coins.value = :value', { value: coin.value })
      .execute()

    const updatedCoin = await this.coinRepository.findOneOrFail({ where: { value: coin.value } })

    return updatedCoin
  }

  async checkQuantityCoin (): Promise<Coin[]> {
    const coins = await this.coinRepository.find()

    return coins
  }

  async findByValue (value: number): Promise<Coin | undefined> {
    const coin = await this.coinRepository.findOne({ where: { value } })

    return coin
  }

  async addCoin (coinToSave: ICoinToAddDTO[]): Promise<Coin[]> {
    const savedCoins: Coin[] = []

    for (const coin of coinToSave) {
      const savedCoin = await this.coinRepository.save(coin)

      savedCoins.push(savedCoin)
    }

    return savedCoins
  }

  async deleteAll (): Promise<Coin[]> {
    await getConnection().createQueryBuilder().delete().from(Coin).execute()

    const coins = this.coinRepository.find()

    return coins
  }
}

export { CoinRepository }
