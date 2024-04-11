import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

}