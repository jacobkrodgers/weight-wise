import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// This entity stores up to five user-provided weight-loss progression photos.

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  startingPhoto: string;

  @Column()
  firstPhoto: string;

  @Column()
  secondPhoto: string;
}
