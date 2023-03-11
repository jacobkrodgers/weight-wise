import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Relation } from 'typeorm';
import { User } from './User';

// This entity stores up to five user-provided weight-loss progression photos.

@Entity()
export class ProgressionPhotos {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column('simple-json')
  progressionPhotos: { photo: string; uploadDate: Date };

  @ManyToOne(() => User, (user) => user.userId)
  book: Relation<User>[];
}
