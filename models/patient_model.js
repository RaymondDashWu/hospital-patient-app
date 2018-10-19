const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Patient = mongoose.model('Patient', {
    patient_name: String,
    patient_id: {type: Schema.Types.ObjectId, ref: 'Patient'},
});

module.exports = Patient;
