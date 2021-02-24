import { Coin } from '../infra/typeorm/entities/coin.entity'

class FormatService {
  constructor () { /** */ }

  formatMonetaryDescription (value: number | string, quantity: number) {
    const valueToFormat = (typeof value === 'number') ? value : parseFloat(value)

    const formattedValue = Intl.NumberFormat([], { style: 'currency', currency: 'BRL' }).format(valueToFormat)

    const decimalValue = (typeof value === 'number') ? value.toFixed(2) : value

    const formattedDescription: { [key: string]: string } = {
      '0.01': 'centavo',
      '0.05': 'centavos',
      '0.10': 'centavos',
      '0.25': 'centavos',
      '0.50': 'centavos',
      '1.00': 'real'
    }

    const formattedCoinDescription = `${formattedValue} ${formattedDescription[decimalValue]}: ${quantity}`

    return formattedCoinDescription
  }

  formatChangeValue (value: string | number) {
    if (typeof value === 'number') return value

    const changeStringFormat = value.replace(/[^0-9,.]/gi, '').replace(/[,]/gi, '.')

    return parseFloat(changeStringFormat)
  }

  formatCurrencyList (coins: Coin[]) {
    const quantityCoins: { [key: string]: number } = {
      '1.00': 0,
      '0.50': 0,
      '0.25': 0,
      '0.10': 0,
      '0.05': 0,
      '0.01': 0
    }

    for (const coin of coins) {
      const coinValue = coin.value.toFixed(2)

      quantityCoins[coinValue] = quantityCoins[coinValue] + 1
    }

    return quantityCoins
  }

  formatQuantityCoins (quantityCoins: { [key: string]: number }) {
    return Object.keys(quantityCoins).map((coin) => this.formatMonetaryDescription(parseFloat(coin), quantityCoins[coin]))
  }
}

export { FormatService }
