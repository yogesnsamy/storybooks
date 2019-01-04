const express = require('express');
const mongoose = require('mongoose');
const app = express();

port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('holla');
});

app.listen(port, () => {
  console.log(`port #: ${port}`);
});
