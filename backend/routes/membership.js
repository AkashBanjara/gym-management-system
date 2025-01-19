const express = require('express');
const router = express.Router()
const { addMembership, getMembership } = require('../controllers/membership');
const auth = require('../Auth_middle/auth')

router.post("/add-membership", auth, addMembership );
router.get("/get-membership",auth, getMembership )

module.exports = router