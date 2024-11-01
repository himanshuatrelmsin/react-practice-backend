// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    username: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    cpassword: { type: String, required: true },
},
{
    timestamps:true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
