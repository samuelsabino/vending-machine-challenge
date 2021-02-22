import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

@Entity('coisns', { schema: 'vending_machine' })
class Coin {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column({ length: 20 })
  name: string

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
