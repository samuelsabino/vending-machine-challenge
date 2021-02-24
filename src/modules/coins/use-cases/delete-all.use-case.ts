import { ICoinRepository } from '../interfaces/coin.interface'

class DeleteAllUseCase {
  constructor (private coinRepository: ICoinRepository) { /** */ }

  async execute () {
    const result = await this.coinRepository.deleteAll()

    return result
  }
}

export { DeleteAllUseCase }
