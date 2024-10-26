const AuthService = require("./auth.service");
const autoBind = require("auto-bind");
const AuthMessage = require("./auth.message");
const NodeEnv = require("../../common/constant/env.enum");
const CookieNames = require("../../common/constant/cookie.enum");

class AuthController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = AuthService;
  }

  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      await this.#service.sendOTP(mobile);
      return res.json({
        message: AuthMessage.SendOtpSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }

  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      const token = await this.#service.checkOTP(mobile, code);
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env["NODE_ENV"] === NodeEnv.Production,
        })
        .status(200)
        .json({
          message: AuthMessage.LoginSuccessfully,
        });
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie(CookieNames.AccessToken).status(200).json({
        message: AuthMessage.LogoutSuccessfully,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
