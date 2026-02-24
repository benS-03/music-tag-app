const express = require('express');
const router = express.Router();
const {getUserIdWithAuth0, createUser} = require('../services/userService.js');
const checkJwt = require('../middleware/auth.js');
const ensureUser = require('../middleware/ensureUser.js')

router.post('/create-user', checkJwt, ensureUser, async (req, res) => {

    res.status(201).json({user: req.user});
});

module.exports = router;