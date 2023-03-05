import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    passwordHash: string;

    @Column({ default: false })
    verifiedEmail: boolean;

    @Column({ default: 0 })
    profileViews: number;

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
    userProteinGramsNeededDaily: number

    @Column({ unique: true })
    userFatGramsNeededDaily: number

    @Column({ unique: true })
    userCarbohydratesLowEndGramsNeededDaily: number

    @Column({ unique: true })
    userCarbohydratesHighEndGramsNeededDaily: number
}