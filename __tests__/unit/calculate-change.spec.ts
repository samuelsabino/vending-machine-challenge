import { ICoinToAddDTO } from '../../src/modules/coins/dtos/coin-to-add.dto'
import { FakeCoinRepository } from '../../src/modules/coins/infra/fake/repositories/fake-coin.repository'
import { ICoinRepository } from '../../src/modules/coins/interfaces/coin.interface'
import { CalculateChangeUseCase } from '../../src/modules/coins/use-cases/calculate-change.use-case'

describe('UNIDADE | Calcular a quantidade de moedas retornadas em função do troco.', () => {
  let coinRepository: ICoinRepository
  let calculateChangeUseCase: CalculateChangeUseCase
  let coinsToSave: ICoinToAddDTO[] = []

  beforeEach(async () => {
    coinRepository = new FakeCoinRepository()
    calculateChangeUseCase = new CalculateChangeUseCase(coinRepository)

    coinsToSave = [
      { value: 0.01, quantity: 20 },
      { value: 0.05, quantity: 13 },
      { value: 0.10, quantity: 2 },
      { value: 0.25, quantity: 22 },
      { value: 0.50, quantity: 1 },
      { value: 1.00, quantity: 14 }
    ]

    for (const coin of coinsToSave) coinRepository.updateQuantityCoin(coin)
  })

  test('[ERRO] Quando é passado um valor acima do que o valor maximo de moedas na maquina.', (done) => {
    const result = calculateChangeUseCase.execute(999, coinsToSave)

    expect(result).rejects.toMatchObject({ message: 'Valor informado está acima do valor atual em caixa.' })

    done()
  })

  test('[ERRO] Quando é passado um valor abaixo do valor minimo de moedas na maquina para calculo do troco.', (done) => {
    const result = calculateChangeUseCase.execute(0, coinsToSave)

    expect(result).rejects.toMatchObject({ message: 'Informe um valor válido para cálculo do troco (maior ou igual a 1 centavo).' })

    done()
  })

  test('[ERRO] Quando não há mais moedas disponiveis na maquina para calculo do troco.', (done) => {
    const coinsToSave = [
      { value: 0.01, quantity: -20 },
      { value: 0.05, quantity: -13 },
      { value: 0.10, quantity: -2 },
      { value: 0.25, quantity: -22 },
      { value: 0.50, quantity: -1 },
      { value: 1.00, quantity: -14 }
    ]

    const result = calculateChangeUseCase.execute(1, coinsToSave)

    expect(result).rejects.toMatchObject({ message: 'Não há mais moedas disponiveis para o troco.', statusCode: 404 })

    done()
  })

  test('Quando eu checo a quantidade de moedas disponiveis.', async (done) => {
    const expectResult = [
      'R$ 1,00 real: 14',
      'R$ 0,50 centavos: 0',
      'R$ 0,25 centavos: 0',
      'R$ 0,10 centavos: 0',
      'R$ 0,05 centavos: 0',
      'R$ 0,01 centavo: 0'
    ]

    const result = await calculateChangeUseCase.execute(14, coinsToSave)

    expect(result).toEqual(expectResult)
    done()
  })

  test('Quando eu checo se a lista de informação da quantidade de moedas retorna o tamanho esperado (6).', async (done) => {
    const result = await calculateChangeUseCase.execute(14, coinsToSave)

    expect(result).toHaveLength(6)
    done()
  })
})
