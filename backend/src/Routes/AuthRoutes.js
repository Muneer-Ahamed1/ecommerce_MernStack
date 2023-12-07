const express = require('express');
const { createUser, loginUser, checkAuth,  logout } = require('../Controllers/AuthController');
const passport = require('passport');

const router = express.Router();
//  /auth is already added in base path
router.post('/signup', createUser)
.post('/login', passport.authenticate('local'),loginUser)
.get('/check',passport.authenticate('jwt'), checkAuth)
.get('/logout', logout)

module.exports=router;