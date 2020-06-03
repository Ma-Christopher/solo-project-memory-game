const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Load env variables
dotenv.config({ path: './config/config.env' });

const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

const app = express();

const PORT = process.env.PORT || 3000;
const mongoURI = process.env.mongoURI;

console.log('NODE_ENV ->', process.env.NODE_ENV);

const connectDB = async () => {
  const conn = await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

connectDB();

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// set up request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting up cookie parser
app.use(cookieParser());

app.use('/build', express.static(path.join(__dirname, '../build')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// app.get('/register', (req, res) => {
//   res.send('get /register');
// });

app.post('/register', userController.createUser, cookieController.setSSIDCookie, (req, res) => {
  // console.log('successful registration');
  res.send({ verified: true, username: res.locals.username, gamesPlayed: res.locals.gamesPlayed });
});

// REMOVED SESSTION FROM MIDDLEWARE sessionController.startSession,
app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, (req, res) => {
  // console.log('successful login');
  res.send({ verified: true, username: res.locals.username, gamesPlayed: res.locals.gamesPlayed });
});

app.patch('/update/:username', userController.updateUserData, (req, res) => {
  // console.log('updated users data');
  res.send({ gamesPlayed: res.locals.gamesPlayed });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).send('404 Page Not Found');
});

// Global Error handler
app.use((err, req, res, next) => {
  console.log(`${err}`);
  res.status(500).send('Internal Server Error');
});

// listens on PORT -> http://localhost:PORT/
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
