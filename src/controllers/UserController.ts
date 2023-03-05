import { Request, Response } from 'express';
import argon2 from 'argon2';
import { addUser, getUserByEmail } from '../models/UserModel';
import { parseDatabaseError } from '../utils/db-utils';

async function registerUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as AuthRequest;


        const newUser = await addUser(email, passwordHash);
        console.log(newUser);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        const databaseErrorMessage = parseDatabaseError(err);
        res.status(500).json(databaseErrorMessage);
    }
}

async function logIn(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as AuthRequest;

}

export { registerUser, logIn };
