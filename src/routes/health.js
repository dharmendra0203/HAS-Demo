const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    services: ['people-store', 'follow-rules']
  });
});

module.exports = router;
