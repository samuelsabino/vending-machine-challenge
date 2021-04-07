import { ICoinDTO } from 'modules/coins/dtos/coin.dto'

class FakeCoin implements ICoinDTO {
  id?: number
  value: number
  quantity: number
  created?: Date
  updated?: Date
  version?: number
}

export { FakeCoin }
