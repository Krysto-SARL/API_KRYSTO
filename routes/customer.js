const express = require('express')
const {
  customerLogoUpload,
  getCustomers,
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customers')
const contactRouter = require('./contacts')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const Customer = require('../models/Customers')

const advancedResults = require('../middlewares/advancedResults')
router.use('/:customerId/contacts', contactRouter)
router.route('/:id/logo').put(customerLogoUpload)

// router.use(protect)
// router.use(authorize('admin', 'staff'))

router
  .route('/')
  .get(
    advancedResults(Customer, {
      path: 'contacts origine',
    }),
    getCustomers,
  )

  .post(createCustomer)

router.route('/:id').get(getCustomer).put(updateCustomer).delete(deleteCustomer)

module.exports = router
