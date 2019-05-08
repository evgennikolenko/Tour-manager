const express = require('express');
const passport = require('passport');
const jwtUser = require('./../middleware/jwt-user');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const userController = require('./../controllers/user');
const Avatar = require('./../models').Avatar;
const User = require('./../models').User;

cloudinary.config({
    cloud_name: 'di7nb1sra',
    api_key: '777191857388966',
    api_secret: 'MYa9ohiS4uYhXNDya9_kldwkbxA'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'avatars',
    allowedFormats: ['jpg', 'jpeg', 'png'],
    transformation: [ { width: 500, height: 500, crop: 'limit' } ]
});
const parser = multer({ storage: storage });


const router = express.Router();

// router.get('/user/:id', passport.authenticate('jwt'), userController.getUser);
router.get('/user/:id', userController.getUser);

router.patch('/user', jwtUser.getUser, userController.updateUser);

router.delete('/user/:id', userController.deleteUser);

router.get('/employees', userController.getEmployees);

router.post('/user/avatar/:id', jwtUser.getUser, async(req, res, next) => {
    const id = req.userId;

    let user = await User.findByPk(id,
        {
            include: [ 'role',
                {
                    model: Avatar,
                    as: 'avatar',
                    attributes: [ 'name', 'type', 'path' ]
                } ]
        }
    );

    if(user) {
        if(user.avatar) {
            cloudinary.uploader.destroy(user.avatar.name, () => next());
        } else {
            next();
        }
    } else {
        next();
    }

}, parser.single('image'), userController.uploadAvatar);

module.exports = router;
