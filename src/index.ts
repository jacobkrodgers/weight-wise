import './config';
import 'express-async-errors';
import express, { Express } from 'express';
import { registerUser, logIn } from './controllers/UserProfileController';
import { notImplemented } from './controllers/NotImplemented';

const app: Express = express();
app.use(express.json());
app.use(express.static('public', { extensions: ['html'] }));

const { PORT } = process.env;

app.post('/api/users', registerUser); // Create an account
app.post('/api/login', logIn); // Log in to an account

app.post('/api/:userName/progress-photos', notImplemented); // Upload progress photo
app.get('/api/:userName/progress-photos', notImplemented); // View progress photos

app.post('/api/:userName/weight-tracking', notImplemented); // Create weight-loss profile for user  ---- Jeffrey
app.get('/api/:userName/weight-tracking', notImplemented); // View user's weight-loss profile  ---- Jeffrey

app.get('/api/:userName/badges', notImplemented); // Displays badges from rewards system ---- Jacob

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
