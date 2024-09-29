const rodents = require('../models/rodentModel')
const mongoose = require('mongoose')

// Get all Anomaluromorpha spp.
const getAnomaluromorpha = async (req, res) => {
    const rodentQuery = await rodents.find({ suborder: "Anomaluromorpha", isApproved: true }).sort({ family: 1, binomialName: 1 })
    res.status(200).json(rodentQuery)
}

// Get all Castorimorpha spp.
const getCastorimorpha = async (req, res) => {
    const rodentQuery = await rodents.find({ suborder: "Castorimorpha", isApproved: true }).sort({ family: 1, binomialName: 1 })
    res.status(200).json(rodentQuery)
}

// Get all Hystricomorpha spp.
const getHystricomorpha = async (req, res) => {
    const rodentQuery = await rodents.find({ suborder: "Hystricomorpha", isApproved: true }).sort({ family: 1, binomialName: 1 })
    res.status(200).json(rodentQuery)
}

// Get all Myomorpha spp.
const getMyomorpha = async (req, res) => {
    const rodentQuery = await rodents.find({ suborder: "Myomorpha", isApproved: true }).sort({ family: 1, binomialName: 1 })
    res.status(200).json(rodentQuery)
}

// Get all Sciuromorpha spp.
const getSciuromorpha = async (req, res) => {
    const rodentQuery = await rodents.find({ suborder: "Sciuromorpha", isApproved: true }).sort({ family: 1, binomialName: 1 })
    res.status(200).json(rodentQuery)
}

// Get all spp.
const getRodents = async (req, res) => {
    const rodentQuery = await rodents.find({ isApproved: true }).sort({ family: 1, binomialName: 1 })
    res.status(200).json(rodentQuery)
}

// Delete a rodent
const deleteRodent = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'Rodent not found!' })
    const rodentQuery = await rodents.findOneAndDelete({ _id: id })
    if (!rodentQuery)
        return res.status(400).json({ error: 'Rodent not found!' })
    res.status(200).json(rodentQuery)
}

// Update a rodent
const updateRodent = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'Rodent not found!' })
    const rodentQuery = await rodents.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!rodentQuery)
        return res.status(400).json({ error: 'Rodent not found!' })
    res.status(200).json(rodentQuery)
}


module.exports = {
    getAnomaluromorpha,
    getCastorimorpha,
    getHystricomorpha,
    getMyomorpha,
    getSciuromorpha,
    getRodents,
    deleteRodent,
    updateRodent
}