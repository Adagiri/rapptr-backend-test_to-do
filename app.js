const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Hi!!, Welcome to Rapptr Lab.`);
});

module.exports = app;
