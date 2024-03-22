const express = require('express');
const app = express();
const PORT = 8000;
const userRoutes = require('./routes/routes');
const dotenv  = require('dotenv')
dotenv.config();

const Connection = require('./db/db');
Connection();
app.use(express.json()); // Middleware to parse JSON request bodies

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*") // * becuase front end not created 
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next()
})

app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
