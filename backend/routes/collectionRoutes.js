const express = require('express')
const router = express.Router()
const {
  getRodentsBySuborder,
  deleteRodent,
  updateRodent
} = require('../controllers/controller')

// GET collections 4 button page
router.get('/', (req, res) => {
  res.json({ mssg: 'GET collections' })
})

// GET rodents by suborder
router.get('/:suborder', getRodentsBySuborder)

// DELETE a single rodent
router.delete('/:id', deleteRodent)

// UPDATE a single rodent
router.patch('/:id', updateRodent)

module.exports = router