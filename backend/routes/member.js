const express = require('express');
const { getAllMembers, registerMember, searchMember, monthlyMember, expiringwithin3Days, expiringWithin4To7days, expired, inactive, getMemberDetails, changeStatus, updateMemberPlan } = require('../controllers/member');
const auth = require('../Auth_middle/auth');
const router = express.Router()

router.get("/all-member", auth, getAllMembers)
router.post("/register-member", auth, registerMember)

router.get("/search-members", auth, searchMember)
router.get("/monthly-member", auth, monthlyMember)
router.get("/within-3-days-expiring", auth, expiringwithin3Days)
router.get("/within-4-7-expiring", auth, expiringWithin4To7days)
router.get("/expired-member", auth, expired)
router.get("/inactive-member", auth, inactive)

router.get("/get-member/:id",auth, getMemberDetails )
router.post("/change-status/:id",auth, changeStatus )
router.put("/update-member-plan/:id", auth,updateMemberPlan )

module.exports = router;