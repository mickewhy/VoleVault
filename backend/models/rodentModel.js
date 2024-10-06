const mongoose = require('mongoose')

const rodentSchema = new mongoose.Schema({
    commonName: { type: String, required: false, unique: false },
    binomialName: { type: String, required: false, unique: false },
    suborder: { type: String, required: false, unique: false },
    family: { type: String, required: false, unique: false },
    sex: { type: String, required: false, unique: false },
    age: { type: String, required: false, unique: false },
    origin: { type: Array, required: false, unique: false },
    dateOfAcquisition: { type: Date, required: false, unique: false },
    causeOfDeath: { type: String, required: false, unique: false },
    dimensions: { type: Array, required: false, unique: false },
    cleaningMethod: { type: String, required: false, unique: false },
    notes: { type: String, required: false, unique: false },
    imageLinks: { type: Array, required: false, unique: false, validate: [arrayLimit, '{PATH} exceeds the limit of 6'] },
    credit: { type: String, required: false, unique: false },
    copyrightInfo: { type: String, required: false, unique: false },
    isApproved: { type: Boolean, required: false, unique: false },
    username: { type: String, required: false, unique: false },
}, { timestamps: true })

function arrayLimit(val) {
    return 0 < val.length <= 6
}

module.exports = mongoose.model('RodentSchema', rodentSchema)