import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Relation } from 'typeorm';
import { User } from './User';

// Stores the path to a progression photo and the date it was uploaded.

@Entity()
export class ProgressionPhotos {
  @PrimaryGeneratedColumn('uuid')
  photoId: string;

  @Column({ unique: true })
  photoPath: string;

  @Column()
  uploadDate: Date;

  @ManyToOne(() => User, (user) => user.userId)
  book: Relation<User>;
}
