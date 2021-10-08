require('dotenv/config');
const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.url} was called with`, req.body);
  next();
});

app.post('/test1', (req, res, next) => {
  res.send({ message: 'Test1 was called', data: req.body });
});

app.post('/test2', (req, res, next) => {
  res.send({ message: 'Test2 was called', data: req.body });
});

app.get('/', (req, res) => {
  res.send({ message: 'This is subscriber server' });
});

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(process.env.SUBSCRIBER_PORT || 9000, () => {
  console.log('Subscriber is listening at port', process.env.SUBSCRIBER_PORT);
});
