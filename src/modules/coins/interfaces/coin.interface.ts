import { ICoinToAddDTO } from '../dtos/coin-to-add.dto'
import { Coin } from '../infra/typeorm/entities/coin.entity'

interface ICoinRepository {
  updateQuantityCoin (coin: Coin): Promise<Coin>
  checkQuantityCoin (): Promise<Coin[]>
  findByValue (value: number): Promise<Coin | undefined>
  addCoin (coin: ICoinToAddDTO[]): Promise<Coin[]>
  deleteAll (): Promise<Coin[]>
}

export { ICoinRepository }
