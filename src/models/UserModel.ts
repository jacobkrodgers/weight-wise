import { AppDataSource } from '../dataSource';
import { User } from '../entities/User';
import { UserWeights } from '../entities/Weight';


const userRepository = AppDataSource.getRepository(User);
const weightRepository = AppDataSource.getRepository(UserWeights);

async function addUser(email: string, passwordHash: string): Promise<User> {
    // Create the new user object
    let newUser = new User();
    newUser.email = email;
    newUser.passwordHash = passwordHash;

    // Then save it to the database
    // NOTES: We reassign to `newUser` so we can access
    // NOTES: the fields the database autogenerates (the id & default columns)
    newUser = await userRepository.save(newUser);

    return newUser;
}

async function getUserByEmail(email: string): Promise<User | null> {
    return userRepository.findOne({ where: { email } });
}

async function daysForChange(userTargetDate: string, userID: string): Promise<Array<number>> {
    const startDate: Date = new Date();
    const currentDate: Date = new Date();
    const targetDate: Date = new Date(userTargetDate);

    const totalDaysForChange = targetDate.getTime() - startDate.getTime();
    const currentDaysForChange = targetDate.getTime() - currentDate.getTime();

    const eventDays: Array<number> = [totalDaysForChange, currentDaysForChange];

    weightRepository.findOne({ where: { userID } });

    let userWeight = new UserWeights();
    userWeight.userTargetWeightTotalDays = eventDays[0];
    userWeight.userTargetWeightCurrentDaysLeft = eventDays[1];

    userWeight = await weightRepository.save(userWeight);

    return eventDays;
}

async function recommendedCalorieIntake(): Promise<number> {
    const user = new User();

    let BMR;
    const sex = user.userSex.toLowerCase();
    const heightInInches = user.userHeightinFeet * 12 + user.userHeightinInches;

    const userWeightInKG = (user.userWeight * 16) / 28.3495 / 1000;
    const UserHeightToCentimeters = heightInInches * 2.54;

    if (sex === 'male') {
        BMR = 10 * userWeightInKG + 6.25 * UserHeightToCentimeters - 5 * user.userAge + 5;
    } else if (sex === 'female') {
        BMR = 10 * userWeightInKG + 6.25 * UserHeightToCentimeters - 5 * user.userAge - 161;
    }
    return 0; // temp
}

