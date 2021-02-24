import { AppError } from '../../../shared/errors/app.error'
import { Coin } from '../infra/typeorm/entities/coin.entity'

class ValidateService {
  constructor () { /** */ }

  public validateAmountOfCoinsSaved (coins: Coin[], changeValue: number) {
    let total = 0

    for (const coin of coins) total += coin.quantity * coin.value

    return total >= changeValue
  }

  public validateAmountOfCoins (valor: number, coins: Coin[], amountOfCoins: Coin[]): Coin[] {
    const coinsValue = (JSON.parse(JSON.stringify((coins))) as Coin[])
      .sort((a, b) => (a.value > b.value) ? -1 : (a.value < b.value) ? 1 : 0)

    const selectedCurrency = coinsValue.find((coin) => {
      if ((valor - coin.value >= 0) && (coin.quantity > 0)) {
        coin.quantity = coin.quantity - 1

        return coin
      }

      return undefined
    })

    if (!selectedCurrency) throw new AppError('Não há mais nenhuma moeda disponivel.')

    const valorRestante = parseFloat((valor - selectedCurrency.value).toFixed(2))

    amountOfCoins.push({ ...selectedCurrency })

    return (valorRestante === 0)
      ? amountOfCoins
      : this.validateAmountOfCoins(valorRestante, coinsValue, amountOfCoins)
  }
}

export { ValidateService }
