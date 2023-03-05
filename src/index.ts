import './config';
import 'express-async-errors';
import express, { Express } from 'express';
import { registerUser, logIn } from './controllers/UserController';

const app: Express = express();
app.use(express.json());

const { PORT } = process.env;

app.post('/users', registerUser); // Create an account
app.post('/login', logIn); // Log in to an account

// post('/user/weight-tracking') ---- Jeffrey
// get('/user/weight-tracking')  ---- Jeffrey

// post('/user/progress-photos') ---- Jacob
// get('/user/progress-photos')  ---- Jacob

// post('/user/profile')         ---- Jacob
// get('/user/profile')          ---- Jacob

// post('/user/badges')          ---- Jacob
// get('/user/badges')           ---- Jacob

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});