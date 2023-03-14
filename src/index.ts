import './config';
import 'express-async-errors';
import express, { Express } from 'express';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import { registerUser, logIn } from './controllers/UserProfileController';
import { notImplemented } from './controllers/NotImplemented';

const { PORT, COOKIE_SECRET } = process.env;
const app: Express = express();
const SQLiteStore = connectSqlite3(session);

app.use(
  session({
    store: new SQLiteStore({ db: 'sessions.sqlite' }),
    secret: COOKIE_SECRET,
    cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 hours
    name: 'session',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.static('public', { extensions: ['html'] }));

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
