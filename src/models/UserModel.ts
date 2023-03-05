import { AppDataSource } from '../dataSource';
import { User } from '../entities/User';


const userRepository = AppDataSource.getRepository(User);

async function addUser(email: string, passwordHash: string): Promise<User> {

