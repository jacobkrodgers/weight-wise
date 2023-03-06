import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// This entity stores the minimum information required to create an account.

@Entity()
export class UserProfile {
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
}
