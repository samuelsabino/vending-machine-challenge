import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCoin1613522606763 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'coins',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'value',
            type: 'decimal',
            precision: 3,
            isUnique: true,
            scale: 2
          },
          {
            name: 'quantity',
            type: 'int'
          },
          {
            name: 'created',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'version',
            type: 'int',
            default: 1
          }
        ]
      }), true)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('coins')
  }
}
