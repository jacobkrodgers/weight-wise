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

