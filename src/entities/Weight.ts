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
}
