import './config';
import 'express-async-errors';
import express, { Express } from 'express';
import { registerUser, logIn } from './controllers/UserProfileController';

const app: Express = express();
app.use(express.json());

const { PORT } = process.env;

app.post('/users', registerUser); // Create an account
app.post('/login', logIn); // Log in to an account

// post('/api/user/weight-tracking') ---- Jeffrey
// get('/api/user/weight-tracking')  ---- Jeffrey

// post('/api/user/progress-photos') ---- Jacob
// get('/api/user/progress-photos')  ---- Jacob

// post('/api/user/profile')         ---- Jacob
// get('/api/user/profile')          ---- Jacob

// post('/api/user/badges')          ---- Jacob
// get('/api/user/badges')           ---- Jacob

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
