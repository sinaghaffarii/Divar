const { Router } = require("express");
const AuthController = require("./auth.controller");
const router = Router();

router.post("/send-otp", AuthController.sendOTP);
router.post("/check-otp", AuthController.checkOTP);
router.post("/logout", AuthController.logout);

module.exports = {
  AuthRouter: router,
};
