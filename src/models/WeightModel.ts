import { AppDataSource } from '../dataSource';
import { UserWeights } from '../entities/Weight';
import { DietInfo } from '../entities/DietInfo';

const weightRepository = AppDataSource.getRepository(UserWeights);
const userRepository = AppDataSource.getRepository(UserWeights);

async function daysForChange(userTargetDate: string, userID: string): Promise<Array<number>> {
  const startDate: Date = new Date();
  const currentDate: Date = new Date();
  const targetDate: Date = new Date(userTargetDate);

  const totalDaysForChange = targetDate.getTime() - startDate.getTime();
  const currentDaysForChange = targetDate.getTime() - currentDate.getTime();

  const eventDays: Array<number> = [totalDaysForChange, currentDaysForChange];

  weightRepository.findOne({ where: { userID } });

  let userWeight = new UserWeights();
  [userWeight.userTargetWeightTotalDays, userWeight.userTargetWeightCurrentDaysLeft] = eventDays;

  userWeight = await weightRepository.save(userWeight);

  return eventDays;
}

async function recommendedCalorieIntake(userID: string): Promise<Array<number>> {
  let userInfo = new UserWeights();

  let BMR = 0; // Basal Metabolic Rate
  const sex = userInfo.userSex.toLowerCase();
  const heightInInches = userInfo.userHeightInFeet * 12 + userInfo.userHeightInInches;

  const userWeightInKG = (userInfo.userWeight * 16) / 28.3495 / 1000;
  const UserHeightToCentimeters = heightInInches * 2.54;

  if (sex === 'male') {
    BMR = 10 * userWeightInKG + 6.25 * UserHeightToCentimeters - 5 * userInfo.userAge + 5;
  } else if (sex === 'female') {
    BMR = 10 * userWeightInKG + 6.25 * UserHeightToCentimeters - 5 * userInfo.userAge - 161;
  }

  let TDEE = 0; // Total Daily Energy Expenditure
  let TDEE_COUNT = 0;

  if (userInfo.userWeeklyWorkout <= 0) {
    TDEE = BMR * 1.2;
    TDEE_COUNT = 1;
  } else if (userInfo.userWeeklyWorkout >= 1 && userInfo.userWeeklyWorkout <= 3) {
    TDEE = BMR * 1.375;
    TDEE_COUNT = 2;
  } else if (userInfo.userWeeklyWorkout >= 4 && userInfo.userWeeklyWorkout <= 5) {
    TDEE = BMR * 1.55;
    TDEE_COUNT = 3;
  } else if (userInfo.userWeeklyWorkout >= 6 && userInfo.userWeeklyWorkout <= 7) {
    TDEE = BMR * 1.725;
    TDEE_COUNT = 4;
  } else {
    TDEE = BMR * 1.9;
    TDEE_COUNT = 5;
  }

  let userDietInfo = new DietInfo();

  let proteinGrams = 0;
  let carbohydrateGramsLowEnd = 0;
  let carbohydrateGramsHighEnd = 0;
  let fatGrams = 0;
  const bodyWeightInKG = userInfo.userWeight / 2.2;

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
  carbohydrateGramsLowEnd = 2000 * 0.45;
  carbohydrateGramsHighEnd = 2000 * 0.65;

  const gramsOfCalories: Array<number> = [
    proteinGrams,
    fatGrams,
    carbohydrateGramsLowEnd,
    carbohydrateGramsHighEnd,
  ];

  userRepository.findOne({ where: { userID } });

  [
    userDietInfo.userProteinGramsNeededDaily,
    userDietInfo.userFatGramsNeededDaily,
    userDietInfo.userCarbohydratesLowEndGramsNeededDaily,
    userDietInfo.userCarbohydratesHighEndGramsNeededDaily,
  ] = gramsOfCalories;

  userInfo = await userRepository.save(userInfo);
  userDietInfo = await userRepository.save(userDietInfo);

  return gramsOfCalories;
}

export { daysForChange, recommendedCalorieIntake };
