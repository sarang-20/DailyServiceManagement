const mongoose = require('mongoose')

const milkprovider = new mongoose.Schema({
    milk_provider_id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    PhoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    prize: {
        type: Number,
        required: true
    },
    morning: {
        type: Boolean,
        required: true,
    },
    morning_start: {
        type: String,
    },
    morning_end: {
        type: String,
    },
    evening: {
        type: Boolean,
        required: true,
    },
    evening_start: {
        type: String,
    },
    evening_end: {
        type: String,
    }
})



const Milkprovider = mongoose.model('milkprovider', milkprovider);
module.exports = Milkprovider;