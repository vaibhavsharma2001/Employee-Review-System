const express = require('express');

const router = express.Router();

const allController = require('../controllers/home_controller');

router.get('/', allController.home);
router.get('/register', allController.register);
router.post('/registerByAdmin/create', allController.createByAdmin);
router.get('/login', allController.login);
router.post('/register/create', allController.create);
router.get('/logout', allController.destroySession);
router.get('/profile', allController.profile);
router.post('/signIn', allController.signIn);
router.post('/adminUpdate/:name', allController.updateByAdmin);
router.get('/profileByAdmin/:name', allController.profileVisitByAdmin);
router.post(
  '/profileByAdmin/AssignReview/:candidateName',
  allController.assignReview
);
router.get('/reviewForm/:name', allController.reviewFormGet);
router.post('/review/result/:name', allController.reviewFormSave);
router.get('/forgotPassword', allController.forgotPwd);
router.post('/changePass', allController.changePassword);
router.get('/deleteByAdmin/:name', allController.deleteByAdmin);
module.exports = router;
