import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  constructor(partial: Partial<Cat>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'int', nullable: true })
  age?: number;

  @Column({ length: 150, type: 'varchar', nullable: true })
  breed?: string;

  @Column({ type: 'varchar', nullable: true })
  photoUrl?: string;

}