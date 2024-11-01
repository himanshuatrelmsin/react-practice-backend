// models/User.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    userId : { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    company_name: { type: String },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    street_address1: { type: String, required: true },
    street_address2: { type: String },
    pincode: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    default_address: { type: Boolean },
},
{
    timestamps:true,
});

const Location = mongoose.model('location', locationSchema);

module.exports = Location;
