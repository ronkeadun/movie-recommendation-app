const express = require('express');
const router = express.Router();
const { register, login, fetchUser, logout } = require('../controllers/authController');
const {
  createUserValidator,
  signInUserValidator,
  validate
} = require('../validators/validatorMiddlewares');



router.post('/signup', createUserValidator, validate, register);

router.post('/login', signInUserValidator, validate, login);

router.get("/fetch-user", fetchUser)

router.post("/logout", logout)

module.exports = router;