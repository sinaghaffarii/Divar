const {Schema, model} = require("mongoose");


const OTPSchema = new Schema({
    code: {type: String, required: false, default: undefined},
    expiresIn: {type: Number, required: false, default: 0},
})

const UserSchema = new Schema({
    fullName: {type: String, required: false},
    mobile: {type: String, unique: true, required: true},
    otp: OTPSchema,
    verifiedMobile: {type: Boolean, default: false, required: true},
}, {
    timestamps: true
})

const UserModel = model("user", UserSchema)
module.exports = UserModel