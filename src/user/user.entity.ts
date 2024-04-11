import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Cat } from '../cats/cat.entity';

@Entity()
export class User  {

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, type: 'varchar', nullable: true })
  name?: string;

  @Column({ length: 300, type: 'varchar'})
  password: string;

  @Column({ unique: true, length: 50, type: 'varchar'})
  email: string;

  @Column('text', { array: true, default: '{}' })
  roles: string[];

  @ManyToMany(() => Cat)
  @JoinTable()
  favorites: Cat[];

}