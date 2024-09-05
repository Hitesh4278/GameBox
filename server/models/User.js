const mongoose = require("mongoose")

const { Schema } = mongoose


const UserSchema = new Schema({

    email: {
        type: String,
        required: [true, "Please Provide an Email"],
        unique: [true, "Email Exist"],
    },

    password: {
        type: String,
        required: [true, "Please Provide an Password"],
    },
    wishlist: [{
        type: String, 
    }],


})

module.exports = mongoose.model('user', UserSchema)