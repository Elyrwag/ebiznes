var express = require('express');
var router = express.Router();
var { registerUser, loginUser, initiateGoogleLogin, processGoogleCallback, initiateGithubLogin, processGithubCallback } = require('../services/authService');

router.get('/google/login', initiateGoogleLogin);
router.get('/google/callback', processGoogleCallback);

router.get('/github/login', initiateGithubLogin);
router.get('/github/callback', processGithubCallback);

router.post('/login', async function(req, res, next) {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);
    res.json({ token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/register', async function(req, res, next) {
  const { email, password } = req.body;

  try {
    const token = await registerUser(email, password);
    res.json({ token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
