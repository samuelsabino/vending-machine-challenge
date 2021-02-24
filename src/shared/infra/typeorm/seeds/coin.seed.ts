import { Coin } from '../../../../modules/coins/infra/typeorm/entities/coin.entity'

const coinSeed: Coin[] = [
  { value: 0.01, quantity: 20 },
  { value: 0.05, quantity: 13 },
  { value: 0.1, quantity: 2 },
  { value: 0.25, quantity: 22 },
  { value: 0.5, quantity: 1 },
  { value: 1, quantity: 14 }
]

export { coinSeed }
