import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @Column({ unique: true })
  userWeight: number;

  @Column({ unique: true })
  userSex: string;

  @Column({ unique: true })
  userHeightinFeet: number;

  userHeightinInches: number;

  @Column({ unique: true })
  userTargetWeight: number;

  @Column({ unique: true })
  userDailyCalorieIntake: number;

  @Column({ unique: true })
  userAge: number;

  @Column({ unique: true })
  userDateForChange: number;
}
