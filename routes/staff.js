const express = require('express');

const staffController = require('./../controllers/staff');

const jwtUser = require('./../middleware/jwt-user');

const router = express.Router();

router.get('/invitations', jwtUser.getUser, staffController.getInvitations);

router.get('/employee/tour/:id', jwtUser.getUser, staffController.getTour);

router.patch('/employee/tour-invitation/:id', jwtUser.getUser, staffController.setInvitation);

router.get('/employee/tours', jwtUser.getUser, staffController.getTours);

router.get('/employee/tours/count', jwtUser.getUser, staffController.getToursCount);

router.get('/employee/earn-money', jwtUser.getUser, staffController.earnMoney);

module.exports = router;
