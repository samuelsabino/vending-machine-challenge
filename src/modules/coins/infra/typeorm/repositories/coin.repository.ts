import { getRepository } from 'typeorm'

import { ICoinRepository } from '../../../../../modules/coins/interfaces/coin.interface'
import { Coin } from '../entities/coin.entity'

class CoinRepository implements ICoinRepository {
  // private coinRepository: Repository<Coin>

  constructor (private coinRepository = getRepository(Coin)) { /** */ }

  async updateQuantityCoin (coin: Coin): Promise<Coin> {
    // await this.coinRepository
    //   .createQueryBuilder().update('coins')
    //   .set({ quantity: coin.quantity })
    //   .where('coins.id = :id', { id: coin.id })
    //   .execute()

    // const updatedCoin = await this.coinRepository.findOneOrFail({ where: { id: coin.id } })

    // return updatedCoin

    return coin
  }

  async checkQuantityCoin (): Promise<Coin[]> {
    const coins = await this.coinRepository.find()

    return coins
  }
}

export { CoinRepository }
