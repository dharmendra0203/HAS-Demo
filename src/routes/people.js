const express = require('express');
const { getPeople } = require('../data/store');

const router = express.Router();

router.get('/people', (req, res) => {
  res.json({ people: getPeople() });
});

module.exports = router;