const express = require('express');
const { register, login, sendOtp, checkOtp, resetPassword, checking, logout } = require('../controllers/gym');
const auth = require('../Auth_middle/auth');
const router = express.Router()

router.post("/register", register)
router.post('/login',login )
router.post('/reset-password/sendOTP',sendOtp )
router.post('/reset-password/checkOTP', checkOtp )
router.post('/reset-password', resetPassword )
router.post('/logout',logout)


module.exports=router;