const express = require('express')
// get controller function
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require('../controllers/contacts')
const Contact = require('../models/Contact')
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const advancedResults = require('../middlewares/advancedResults')

router.route('/').get(advancedResults(Contact), getContacts).post(createContact)

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

module.exports = router
