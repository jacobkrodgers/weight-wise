import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from 'typeorm';
import { ProgressionPhotos } from './ProgressionPhotos';

// This entity stores the minimum information required to create an account.

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  passwordHash: string;

  @Column({ default: false })
  verifiedEmail: boolean;

  @Column()
  joinDate: string;

  @OneToMany(() => ProgressionPhotos, (photos) => photos.photoId)
  reviews: Relation<ProgressionPhotos>[];
}
