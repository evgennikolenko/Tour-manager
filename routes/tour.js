const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const tourController = require('./../controllers/tour');
const staffController = require('./../controllers/staff');
const jwtUser = require('./../middleware/jwt-user');
const upload = multer({ dest: 'uploads/' });

cloudinary.config({
    cloud_name: 'di7nb1sra',
    api_key: '777191857388966',
    api_secret: 'MYa9ohiS4uYhXNDya9_kldwkbxA'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'tour-logo',
    allowedFormats: [ 'jpg', 'jpeg', 'png' ],
    transformation: [ { width: 500, height: 500, crop: 'limit' } ],
});
const parser = multer({ storage: storage });


const router = express.Router();


router.post('/tour/create', jwtUser.getUser, parser.single('logo'), async(req, res, next) => {
    next();
}, tourController.createTour);

router.get('/manager/tours', jwtUser.getUser, tourController.getTours);

router.get('/manager/tours/count', jwtUser.getUser, tourController.getToursCount);

router.get('/manager/tour/:id', jwtUser.getUser, tourController.getTour);

router.patch('/manager/tour/update/:id', jwtUser.getUser, tourController.updateTour);

router.get('/tours/manager/money', jwtUser.getUser, tourController.getSpentMoney);

router.get('/places', jwtUser.getUser, tourController.getPlaces);

router.post('/place-weather', tourController.getWeather);

module.exports = router;
