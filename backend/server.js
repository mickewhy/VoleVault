require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const collectionRoutes = require('./routes/collectionRoutes')
const rodents = require('./models/rodentModel')
// const { createRodent } = require('../controllers/controller')

//Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/collections', collectionRoutes)

app.get('/hi', async (req, res) => {
    try {
      const r = await rodents.find(); // Fetch all rodents
      res.json(r);
      console.log(r)
    } catch (error) {
      console.error('Error fetching rodents:', error);
      res.status(500).json({ error: 'Failed to fetch rodents' });
    }
  });
// HOME
app.get('/', (req, res) => {
    res.json({ mssg: 'GET home' })
})

// POST a single submission
app.post('/submissions', async (req, res) => {
    const { commonName, binomialName, suborder, family, sex, age, origin, dateOfAcquisition, causeOfDeath, dimensions, cleaningMethod, notes, links, summary, credit, creditLink, contactInfo, hostedOnWebsite } = req.body
    try {
        const rodent = await rodents.create({ commonName, binomialName, suborder, family, sex, age, origin, dateOfAcquisition, causeOfDeath, dimensions, cleaningMethod, notes, links, summary, credit, creditLink, contactInfo, hostedOnWebsite })
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