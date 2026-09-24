const express = require('express');
const { getPeople, getFollows, getPersonById, setFollow } = require('../data/store');

const router = express.Router();

router.get('/people', (req, res) => {
  res.json({ people: getPeople() });
});

router.get('/follows', (req, res) => {
  res.json({ follows: getFollows() });
});

router.post('/follows/:personId', (req, res) => {
  const personId = req.params.personId;
  const person = getPersonById(personId);

  if (!person) {
    return res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: 'Person not found'
      }
    });
  }

  const result = setFollow(personId, true);
  return res.json({
    personId: result.personId,
    following: result.following,
    changedAt: result.changedAt
  });
});

router.delete('/follows/:personId', (req, res) => {
  const personId = req.params.personId;
  const person = getPersonById(personId);

  if (!person) {
    return res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: 'Person not found'
      }
    });
  }

  const result = setFollow(personId, false);
  return res.json({
    personId: result.personId,
    following: result.following,
    changedAt: result.changedAt
  });
});

module.exports = router;
