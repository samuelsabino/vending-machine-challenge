import { ICoinToAddDTO } from '../../src/modules/coins/dtos/coin.dto'
import { FakeCoinRepository } from '../../src/modules/coins/infra/fake/repositories/fake-coin.repository'
import { ICoinRepository } from '../../src/modules/coins/interfaces/coin.interface'
import { AddCoinsUseCase } from '../../src/modules/coins/use-cases/add-coins.use-case'

describe('UNIDADE | Adicionar Moedas.', () => {
  let coinRepository: ICoinRepository
  let addCoinsUseCase: AddCoinsUseCase
  let coinsToSave: ICoinToAddDTO[]

  beforeEach(async () => {
    coinRepository = new FakeCoinRepository()
    addCoinsUseCase = new AddCoinsUseCase(coinRepository)

    coinsToSave = [
      { value: 0.01, quantity: 20 },
      { value: 0.05, quantity: 13 },
      { value: 0.1, quantity: 2 },
      { value: 0.25, quantity: 22 },
      { value: 0.5, quantity: 1 },
      { value: 1, quantity: 14 }
    ]
  })

  test('Quando eu adiciono moedas na maquina de forma manual.', async (done) => {
    const result = await addCoinsUseCase.execute(coinsToSave)

    expect(result).toStrictEqual(coinsToSave)
    done()
  })

  test('Quando eu checo se a lista de retorno tem o tamanho esperado (6).', async (done) => {
    const result = await addCoinsUseCase.execute(coinsToSave)

    expect(result).toHaveLength(6)
    done()
  })
})
