require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const collectionRoutes = require('./routes/collectionRoutes')
const userRoutes = require('./routes/userRoutes')
const rodents = require('./models/rodentModel')

//Middleware
app.use(express.json())

app.use((req, res, next) => { next() })

app.use('/collections', collectionRoutes)
app.use('/user', userRoutes)

// HOME
app.get('/', (req, res) => {
    res.json()
})

// POST a single submission
app.post('/submissions', async (req, res) => {
    const { commonName, binomialName, suborder, family, sex, age, county, state, country, dateOfAcquisition, causeOfDeath, CBLength, ZBreadth, MLength, FILength, MMRLength, NLength, cleaningMethod, notes, credit, copyrightInfo, isApproved, username } = req.body
    const origin = [county, state, country]
    const requiredDimensions = [CBLength, ZBreadth, MLength]
    const optionalDimensions = [FILength, MMRLength, NLength]
    const dimensions = [requiredDimensions, optionalDimensions]
    const links = []
    try {
        const rodent = await rodents.create({ commonName, binomialName, suborder, family, sex, age, origin, dateOfAcquisition, causeOfDeath, dimensions, cleaningMethod, notes, links, credit, copyrightInfo, isApproved, username })
        res.status(200).json(rodent)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

mongoose.connect(process.env.srv)
    .then(() => {
        app.listen(process.env.port, () => {
            console.log('Connected to Mongoose!')
        })
    })
    .catch((err) => { console.log(err) })