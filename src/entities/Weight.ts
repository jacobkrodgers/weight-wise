import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from 'typeorm';
import { User } from './User';

@Entity()
export class UserWeights {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @Column()
  userTargetWeightTotalDays: number;

  @Column()
  userTargetWeightCurrentDaysLeft: number;

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

  @ManyToOne(() => User, (user) => user.weights)
  user: Relation<User>;
}
