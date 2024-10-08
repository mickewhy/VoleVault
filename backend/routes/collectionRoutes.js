const express = require('express')
const router = express.Router()
const {
  getAnomaluromorpha,
  getCastorimorpha,
  getHystricomorpha,
  getMyomorpha,
  getSciuromorpha,
  getRodents,
  deleteRodent,
  updateRodent
} = require('../controllers/suborderController')

// GET collections 4 button page
router.get('/', (req, res) => {
  res.json()
})

// GET rodents by suborder
router.get('/anomaluromorpha', getAnomaluromorpha)
router.get('/castorimorpha', getCastorimorpha)
router.get('/hystricomorpha', getHystricomorpha)
router.get('/myomorpha', getMyomorpha)
router.get('/sciuromorpha', getSciuromorpha)
router.get('/rodents', getRodents)

// DELETE a single rodent
router.delete('/:id', deleteRodent)

// UPDATE a single rodent
router.patch('/:id', updateRodent)

module.exports = router