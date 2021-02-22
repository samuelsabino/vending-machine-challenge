/* eslint-disable @typescript-eslint/no-unused-vars */

import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'

import { Coin } from '../../../../modules/coins/infra/typeorm/entities/coin.entity'
import { coinSeed } from '../seeds/coin.seed'

export class CoinSeed1613536972060 implements MigrationInterface {
  public async up (_queryRunner: QueryRunner): Promise<void> {
    const coins = getRepository(Coin)

    await coins.save(coinSeed)
  }

  public async down (_queryRunner: QueryRunner): Promise<void> { /** */ }
}
