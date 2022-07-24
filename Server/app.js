const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' });
require('./db/conn');

// app.use(require('./router/auth'));

const PORT = process.env.PORT;

const middleware = (req, res, next) => {
  console.log('This is middleware');
  next();
};

app.get('/', (req, res) => {
  res.send('Hello world from server');
});

app.get('/about', middleware, (req, res) => {
  console.log('Middleware is working');
  res.send('Hello world from about');
});

app.get('/contact', (req, res) => {
  res.send('Hello world from contact');
});

app.get('/signin', (req, res) => {
  res.send('Hello world from signin');
});

app.get('/signup', (req, res) => {
  res.send('Hello world from signup');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
