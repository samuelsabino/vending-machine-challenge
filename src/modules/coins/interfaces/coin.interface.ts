import { Coin } from '../infra/typeorm/entities/coin.entity'

interface ICoinRepository {
  updateQuantityCoin (coin: Coin): Promise<Coin>
  checkQuantityCoin (): Promise<Coin[]>
}

export { ICoinRepository }
