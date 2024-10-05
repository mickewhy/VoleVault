const mongoose = require('mongoose')

const rodentSchema = new mongoose.Schema({
    commonName: { type: String, required: true, unique: false },
    binomialName: { type: String, required: true, unique: false },
    suborder: { type: String, enum: ["Anomaluromorpha", "Castorimorpha", "Hystricomorpha", "Myomorpha", "Sciuromorpha"], required: true, unique: false },
    family: { type: String, required: true, unique: false },
    sex: { type: String, enum: ["Male", "Female"], required: false, unique: false },
    age: { type: String, enum: ["Juvenile", "Subadult", "Adult", "Geriatric Adult"], required: false, unique: false },
    origin: { type: Array, required: false, unique: false },
    dateOfAcquisition: { type: Date, required: true, unique: false },
    causeOfDeath: { type: String, required: false, unique: false },
    dimensions: { type: Array, required: true, unique: false },
    cleaningMethod: { type: String, required: false, unique: false },
    notes: { type: String, required: false, unique: false },
    links: { type: Array, required: true, unique: false, validate: [arrayLimit, '{PATH} exceeds the limit of 6'] },
    credit: { type: String, required: true, unique: false },
    copyrightInfo: { type: String, required: false, unique: false },
    isApproved: { type: Boolean, required: true, unique: false },
    username: { type: String, required: true, unique: false },
}, { timestamps: true })

function arrayLimit(val) {
    return 0 < val.length <= 6
}

module.exports = mongoose.model('RodentSchema', rodentSchema)