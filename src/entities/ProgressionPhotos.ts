import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// This entity stores up to five user-provided weight-loss progression photos.

@Entity()
export class ProgressionPhotos {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column('simple-json')
  begingingPhoto: { photo: string; uploadDate: Date };

  @Column('simple-json')
  progressionPhoto1: { photo: string; uploadDate: Date };

  @Column('simple-json')
  progressionPhoto2: { photo: string; uploadDate: Date };

  @Column('simple-json')
  progressionPhoto3: { photo: string; uploadDate: Date };

  @Column('simple-json')
  progressionPhoto4: { photo: string; uploadDate: Date };

  @Column('simple-json')
  progressionPhoto5: { photo: string; uploadDate: Date };
}
