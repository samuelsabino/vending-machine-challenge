import { Coin } from '@modules/coins/infra/typeorm/entities/coin.model'

export const coinSeed: Coin[] = [
  { name: '1 centavo', value: 0.01, quantity: 20 },
  { name: '5 centavos', value: 0.05, quantity: 13 },
  { name: '10 centavos', value: 0.1, quantity: 2 },
  { name: '25 centavos', value: 0.25, quantity: 22 },
  { name: '50 centavos', value: 0.5, quantity: 1 },
  { name: '1 real', value: 1, quantity: 14 }
]
