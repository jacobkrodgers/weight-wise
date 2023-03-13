import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DietInfo {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @Column()
  userSuggestedCalorieIntake: number;

  @Column()
  userSuggestedHoursToWorkout: number;

  @Column({ unique: true })
  userProteinGramsNeededDaily: number;

  @Column({ unique: true })
  userFatGramsNeededDaily: number;

  @Column({ unique: true })
  userCarbohydratesLowEndGramsNeededDaily: number;

  @Column({ unique: true })
  userCarbohydratesHighEndGramsNeededDaily: number;
}
