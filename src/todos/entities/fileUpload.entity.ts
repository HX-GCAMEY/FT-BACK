import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Todo } from './todo.entity';

@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mimeType: string;

  @Column({ type: 'bytea' })
  data: Buffer;

  @ManyToOne(() => Todo, (todo) => todo.files)
  @JoinColumn({ name: 'todo_id' })
  todo: Todo;
}
