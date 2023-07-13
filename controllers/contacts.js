const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Customer = require('../models/Customers')
const Contact = require('../models/Contact')
const { log } = require('console')

//@description:     Get all contacts
//@ route:          GET /krysto/api/v2/contacts
//@access:          Public
exports.getContacts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description:     Get a single contact
//@ route:          GET /krysto/api/v2/contacts/:id
//@access:          Public
exports.getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    return next(
      new ErrorResponse(`Contact not found with ID of ${req.params.id}`, 404),
    )
  }
  res.status(200).json({ success: true, data: contact })
})

//@description:     Create new contact for a specific customer
//@ route:          POST /krysto/api/v1/customers/:customerId/contacts
//@access:          Private
exports.createContactForCustomer = asyncHandler(async (req, res, next) => {
  // Récupérer l'ID de la catégorie de produits à partir des paramètres de la requête
  const customerId = req.params.customerId

  // Vérifier si la catégorie de produits existe
  const customer = await Customer.findById(customerId)

  if (!customer) {
    return next(
      new ErrorResponse(`No customer  with the id of ${customerId}`, 404),
    )
  }

  const contact = await Contact.create(req.body)

  customer.contacts.push(contact._id)
  await customer.save()
  console.log(customer)
  res.status(201).json({
    success: true,
    data: contact,
  })
})

//@description:     Create new contact
//@ route:          POST /krysto/api/v1/contacts
//@access:          Private
exports.createContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.create(req.body)

  res.status(201).json({
    success: true,
    data: contact,
  })
})

//@description:     Update a contact
//@ route:          PUT /krysto/api/v1/contacts/:id
//@access:          Private
exports.updateContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: contact,
  })
})

//@description:     Delete contact
//@ route:          DELETE /krysto/api/v1/contacts/:id
//@access:          Private
exports.deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id)

  if (!contact) {
    return next(
      new ErrorResponse(`Contact not found with ID of ${req.params.id}`, 404),
    )
  }

  contact.remove()

  res.status(200).json({ success: true, data: {} })
})
