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
    [
      userWeight.userTargetWeightTotalDays, 
      userWeight.userTargetWeightCurrentDaysLeft
    ] = eventDays;

    userWeight = await weightRepository.save(userWeight);

    return eventDays;
}

async function recommendedCalorieIntake(userId: string): Promise<Array<number>> {
    let user = new User();

    let BMR = 0; // Basal Metabolic Rate 
    const sex = user.userSex.toLowerCase();
    const heightInInches = user.userHeightInFeet * 12 + user.userHeightInInches;

    const userWeightInKG = (user.userWeight * 16) / 28.3495 / 1000;
    const UserHeightToCentimeters = heightInInches * 2.54;

    if (sex === 'male') {
        BMR = 10 * userWeightInKG + 6.25 * UserHeightToCentimeters - 5 * user.userAge + 5;
    } else if (sex === 'female') {
        BMR = 10 * userWeightInKG + 6.25 * UserHeightToCentimeters - 5 * user.userAge - 161;
    }

    let TDEE = 0; // Total Daily Energy Expenditure
    let TDEE_COUNT = 0

    if (user.userWeeklyWorkout <= 0) {
      TDEE = BMR * 1.2;
      TDEE_COUNT = 1
    } else if (user.userWeeklyWorkout >= 1 && user.userWeeklyWorkout <= 3) {
      TDEE = BMR * 1.375;
      TDEE_COUNT = 2;
    } else if (user.userWeeklyWorkout >= 4 && user.userWeeklyWorkout <= 5) {
      TDEE = BMR * 1.55;
      TDEE_COUNT = 3;
    } else if (user.userWeeklyWorkout >= 6 && user.userWeeklyWorkout <= 7) {
      TDEE = BMR * 1.725;
      TDEE_COUNT = 4;
    } else {
      TDEE = BMR * 1.9;
      TDEE_COUNT = 5;
    }

    let proteinGrams = 0; let carbohydrateGramsLowEnd = 0; let carbohydrateGramsHighEnd = 0; let fatGrams = 0;
    const bodyWeightInKG = user.userWeight / 2.2;

    // Grams of Protein per day
    if (TDEE_COUNT === 1) {
      proteinGrams = bodyWeightInKG * TDEE;
    } else if (TDEE_COUNT === 2) {
      proteinGrams = bodyWeightInKG * TDEE;
    } else if (TDEE_COUNT === 3) {
      proteinGrams = bodyWeightInKG * TDEE;
    } else if (TDEE_COUNT === 4) {
      proteinGrams = bodyWeightInKG * TDEE;
    } else if (TDEE_COUNT === 5) {
      proteinGrams = bodyWeightInKG * TDEE;
    }

    // Grams of Fat
    fatGrams = bodyWeightInKG;

    // Grams of Carbs
    carbohydrateGramsLowEnd = 2000 * .45;
    carbohydrateGramsHighEnd = 2000 * .65;

    const gramsOfCalories: Array<number> = [proteinGrams, fatGrams, carbohydrateGramsLowEnd, carbohydrateGramsHighEnd];

    userRepository.findOne({ where: { userId }});

    [
      user.userProteinGramsNeededDaily, 
      user.userFatGramsNeededDaily, 
      user.userCarbohydratesLowEndGramsNeededDaily, 
      user.userCarbohydratesHighEndGramsNeededDaily
    ] = gramsOfCalories;

    user = await userRepository.save(user);

    return gramsOfCalories
}


export { addUser, getUserByEmail, daysForChange, recommendedCalorieIntake };