import { ICoinToAddDTO } from '../dtos/coin-to-add.dto'
import { AppError } from '../../../shared/errors/app.error'
import { ICoinRepository } from '../interfaces/coin.interface'
import { FormatService } from '../services/format.service'
import { UtilService } from '../services/util.service'
import { ValidateService } from '../services/validate.service'

class CalculateChangeUseCase {
  constructor (
    private coinRepository: ICoinRepository,
    private validateService = new ValidateService(),
    private formatService = new FormatService(),
    private utilService = new UtilService()
  ) { /** */ }

  async execute (change: string | number, availableCoins: ICoinToAddDTO[]): Promise<string[]> {
    const coins = await this.utilService.addCoinsOnDatabase(availableCoins, this.coinRepository)

    const changeValidated = this.formatService.formatChangeValue(change)

    const checkValueSaved = this.validateService.validateAmountOfCoinsSaved(coins, changeValidated)

    if (coins.every((coin) => !coin.quantity)) throw new AppError('Não há mais moedas disponiveis para o troco.', 404)

    if (!checkValueSaved) throw new AppError('Valor informado está acima do valor atual em caixa.')

    if (!changeValidated) throw new AppError('Informe um valor válido para cálculo do troco (maior ou igual a 1 centavo).')

    const amountOfCoins = this.validateService.validateAmountOfCoins(changeValidated, coins, [])

    const quantityCoins = this.formatService.formatCurrencyList(amountOfCoins)

    const formattedQuantityCoins = this.formatService.formatQuantityCoins(quantityCoins)

    await this.utilService.updateQuantityCoinsOnDatabase(quantityCoins, coins, this.coinRepository)

    return formattedQuantityCoins
  }
}

export { CalculateChangeUseCase }
