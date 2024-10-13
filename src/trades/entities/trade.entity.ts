import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  data: string;

  @Column({ type: 'varchar', length: 36 })
  createdAt: string;

  @Column({ type: 'varchar', length: 36 })
  updatedAt: string;
}
