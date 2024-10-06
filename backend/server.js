require('dotenv').config()
const multer = require('multer')
const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
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

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})

// HOME
app.get('/', (req, res) => {
    res.json()
})

// POST a single submission
app.post('/submissions', upload.array('images'), async (req, res) => {
    console.log('req.body', req.body)
    console.log('req.files', req.files)
    const { commonName, binomialName, suborder, family, sex, age, county, state, country, dateOfAcquisition, causeOfDeath, CBLength, ZBreadth, MLength, FILength, MMRLength, NLength, cleaningMethod, notes, credit, copyrightInfo, isApproved, username } = req.body.rodent
    const origin = [county, state, country]
    const requiredDimensions = [CBLength, ZBreadth, MLength]
    const optionalDimensions = [FILength, MMRLength, NLength]
    const dimensions = [requiredDimensions, optionalDimensions]
    const links = []


    for (let i = 0; i < req.files.length; i++) {
        const uploadParams = {
            Bucket: bucketName,
            Body: req.files[i].buffer,
            Key: req.files[i].originalname,
            ContentType: req.files[i].mimetype
        }

        const command = new PutObjectCommand(uploadParams)
        await s3.send(command)
    }


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