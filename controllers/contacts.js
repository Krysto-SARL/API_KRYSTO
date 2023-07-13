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

//@description:     Create new contact
//@route:          POST /krysto/api/v1/contacts
//@route:          POST /krysto/api/v1/customers/:customer/contacts
//@access:          Private
exports.createContact = asyncHandler(async (req, res, next) => {
  if (req.params.customerId) {
    const customerId = req.params.customerId

    // Vérifier si le client existe
    const customer = await Customer.findById(customerId)
    if (!customer) {
      return next(
        new ErrorResponse(
          `No customer found with the id of ${customerId}`,
          404,
        ),
      )
    }

    // Créer le contact avec les données de la requête
    const contact = await Contact.create(req.body)

    // Ajouter le nouveau contact au tableau de contacts du client
    customer.contacts.push(contact)
    await customer.save()

    res.status(201).json({
      success: true,
      data: contact,
    })
  } else {
    const contact = await Contact.create(req.body)

    res.status(201).json({
      success: true,
      data: contact,
    })
  }
})

//@description:     Get all collects
//@ route:          GET /krysto/api/v1/collects
//@ route:          GET /krysto/api/v1/collectPoints/:collectPointId/collects
//@access:          Public

exports.getCollects = asyncHandler(async (req, res, next) => {
  let query
  if (req.params.collectPointId) {
    query = Collect.find({ collectPoint: req.params.collectPointId })
  } else {
    query = Collect.find()
  }

  const collects = await query
  res.status(200).json({
    success: true,
    count: collects.length,
    data: collects,
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
