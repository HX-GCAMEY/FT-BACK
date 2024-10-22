import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid') // "h23ijh4-sdf345-sdf34534"
  id: string = uuid();

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    default: false,
  })
  isAdmin: boolean;

  @Column()
  password: string;

  @Column()
  createdAt: string;
}
