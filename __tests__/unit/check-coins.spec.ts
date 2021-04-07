import { ICoinToAddDTO } from '../../src/modules/coins/dtos/coin-to-add.dto'
import { FakeCoinRepository } from '../../src/modules/coins/infra/fake/repositories/fake-coin.repository'
import { ICoinRepository } from '../../src/modules/coins/interfaces/coin.interface'
import { CheckCoinsUseCase } from '../../src/modules/coins/use-cases/check-coins.use-case'

describe('UNIDADE | Verificar Quantidade de Moedas disponiveis.', () => {
  let coinRepository: ICoinRepository
  let checkCoinsUseCase: CheckCoinsUseCase

  beforeEach(async () => {
    coinRepository = new FakeCoinRepository()
    checkCoinsUseCase = new CheckCoinsUseCase(coinRepository)

    const coinsToSave: ICoinToAddDTO[] = [
      { value: 0.01, quantity: 20 },
      { value: 0.05, quantity: 13 },
      { value: 0.1, quantity: 2 },
      { value: 0.25, quantity: 22 },
      { value: 0.5, quantity: 1 },
      { value: 1, quantity: 14 }
    ]

    for (const coin of coinsToSave) {
      coinRepository.updateQuantityCoin(coin)
    }
  })

  test('Quando eu checo a quantidade de moedas disponiveis.', async (done) => {
    const expectResult = [
      'R$ 0,01 centavo: 20',
      'R$ 0,05 centavos: 13',
      'R$ 0,10 centavos: 2',
      'R$ 0,25 centavos: 22',
      'R$ 0,50 centavos: 1',
      'R$ 1,00 real: 14'
    ]

    const result = await checkCoinsUseCase.execute()

    expect(result).toStrictEqual(expectResult)
    done()
  })

  test('Quando eu checo se a lista de retorno tem o tamanho esperado (6).', async (done) => {
    const result = await checkCoinsUseCase.execute()

    expect(result).toHaveLength(6)
    done()
  })
})
