const express = require('express')
const router = express.Router()
const {
  getRecyclableProducts,
  getRecyclableProduct,
  createRecyclableProduct,
  updateRecyclableProduct,
  deleteRecyclableProduct,
  recyclableProductPhotoUpload,
  findRecyclableProductByCodeBarre, // Ajout de la nouvelle méthode
} = require('../controllers/recyclableProducts')
const { protect, authorize } = require('../middlewares/auth')
const RecyclableProduct = require('../models/RecyclableProduct')
const advancedResults = require('../middlewares/advancedResults')

router
  .route('/')
  .get(
    advancedResults(RecyclableProduct, 'recyclableProductCategory'),
    getRecyclableProducts,
  )
  .post(createRecyclableProduct)

router
  .route('/:id')
  .get(getRecyclableProduct)
  .put(updateRecyclableProduct)
  .delete(deleteRecyclableProduct)

router.route('/:id/photo').put(recyclableProductPhotoUpload)

// Nouvelle route pour trouver un produit recyclable par code barre
router.route('/codeBarre/:codeBarre').get(findRecyclableProductByCodeBarre)

module.exports = router
