import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserWeights {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @Column()
  userTargetWeightTotalDays: number;

  @Column()
  userTargetWeightCurrentDaysLeft: number;

  @Column()
  userSuggestedCalorieIntake: number;

  @Column()
  userSuggestedHoursToWorkout: number;

  @Column({ unique: true })
  userWeight: number;

  @Column({ unique: true })
  userSex: string;

  @Column({ unique: true })
  userHeightInFeet: number;

  userHeightInInches: number;

  @Column({ unique: true })
  userTargetWeight: number;

  @Column({ unique: true })
  userDailyCalorieIntake: number;

  @Column({ unique: true })
  userAge: number;

  @Column({ unique: true })
  userDateForChange: string;

  @Column({ unique: true })
  userWeeklyWorkout: number;

  @Column({ unique: true })
  userProteinGramsNeededDaily: number;

  @Column({ unique: true })
  userFatGramsNeededDaily: number;

  @Column({ unique: true })
  userCarbohydratesLowEndGramsNeededDaily: number;

  @Column({ unique: true })
  userCarbohydratesHighEndGramsNeededDaily: number;
}
