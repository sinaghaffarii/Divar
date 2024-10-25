const AuthService = require("./auth.service");
const autoBind = require("auto-bind");
const AuthMessage = require('./auth.message')

class AuthController {
    #service;

    constructor() {
        autoBind(this);
        this.#service = AuthService;
    }

    async sendOTP(req, res, next) {
        try {
            const {mobile} = req.body;
            await this.#service.sendOTP(mobile);
            return res.json({
                message: AuthMessage.SendOtpSuccessfully
            });
        } catch (error) {
            next(error)
        }
    }

    async checkOTP(req, res, next) {
        try {
            const {mobile, code} = req.body;
            await this.#service.checkOTP(mobile, code);
            return res.json({
                message: AuthMessage.LoginSuccessfully
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();
