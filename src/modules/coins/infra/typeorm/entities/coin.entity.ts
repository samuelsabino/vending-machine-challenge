import { ICoinDTO } from 'modules/coins/dtos/coin.dto'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

@Entity('coins', { schema: 'vending_machine' })
class Coin implements ICoinDTO {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column('decimal', { precision: 3, scale: 2 })
  value: number

  @Column()
  quantity: number

  @CreateDateColumn({ type: 'timestamp' })
  created?: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated?: Date

  @VersionColumn({ default: false })
  version?: number
}

export { Coin }
