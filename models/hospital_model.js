const mongoose = require('mongoose')

const HospitalSchema = new mongoose.Schema({
    hospital_name: {
        type: String,
        default: "Lorem Ipsum"
    }
})

const Hospital = mongoose.model('Hospital', HospitalSchema)
module.exports = Hospital;