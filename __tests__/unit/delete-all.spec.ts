import { FakeCoinRepository } from '../../src/modules/coins/infra/fake/repositories/fake-coin.repository'
import { ICoinRepository } from '../../src/modules/coins/interfaces/coin.interface'
import { DeleteAllUseCase } from '../../src/modules/coins/use-cases/delete-all.use-case'

describe('UNIDADE | Apagar/remover todas as moedas disponiveis.', () => {
  let coinRepository: ICoinRepository
  let deleteAllUseCase: DeleteAllUseCase

  beforeEach(async () => {
    coinRepository = new FakeCoinRepository()
    deleteAllUseCase = new DeleteAllUseCase(coinRepository)
  })

  test('Quando eu limpo a base de dados e não resta mais nenhum item.', async (done) => {
    const result = await deleteAllUseCase.execute()

    expect(result).toStrictEqual([])
    done()
  })

  test('Quando eu checo se a lista de retorno tem o tamanho esperado (0).', async (done) => {
    const result = await deleteAllUseCase.execute()

    expect(result).toHaveLength(0)
    done()
  })
})
