const mongoose = require('mongoose')

const newsprovider = new mongoose.Schema({
    provider_id: {
        type: String,
        required: true,
    },
    customer_id: {
        type: String,
        required: true,
    },
    request: {
        type: String,
        default: false,
    },
    dates: {
        type: Array,
    },
    month: {
        type: Number,
    },
    year: {
        type: Number,
    }
})
const Newsproviderconnection = mongoose.model('newsproviderconnection', newsprovider);
module.exports = Newsproviderconnection;