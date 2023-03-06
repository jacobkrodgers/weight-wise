import { AppDataSource } from '../dataSource';
import { UserProfile } from '../entities/UserProfile';

const userRepository = AppDataSource.getRepository(UserProfile);

async function addUser(
  firstName: string,
  lastName: string,
  email: string,
  passwordHash: string
): Promise<UserProfile> {
  // Create the new user object
  let newUser = new UserProfile();
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.email = email;
  newUser.passwordHash = passwordHash;
  newUser.joinDate = Date();

  // Then save it to the database
  // NOTES: We reassign to `newUser` so we can access
  // NOTES: the fields the database autogenerates (the id & default columns)
  newUser = await userRepository.save(newUser);

  return newUser;
}

async function getUserByEmail(email: string): Promise<UserProfile | null> {
  return userRepository.findOne({ where: { email } });
}

export { addUser, getUserByEmail };
