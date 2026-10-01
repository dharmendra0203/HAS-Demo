const express = require('express');
const path = require('path');
const healthRoutes = require('./routes/health');
const followRoutes = require('./routes/follows');

const app = express();

app.use(express.json());
app.use('/api', healthRoutes);
app.use('/api', followRoutes);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/activity', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/activity.html'));
});

app.get('/math', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/math.html'));
});

module.exports = app;
