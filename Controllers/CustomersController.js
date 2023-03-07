const { CustomerModel } = require('../Models')

exports.getAllCustomers = (req, res) => {
  const allRecords = CustomerModel.find({})
  allRecords
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}

exports.getSingleCustomer = (req, res) => {
  const customerId = req.params.id

  const singleRecord = CustomerModel.find({ _id: customerId })
  singleRecord
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}

exports.updateSingleCustomer = (req, res) => {
  const data = req.body.data
  const customerId = req.body._id
  CustomerModel.findByIdAndUpdate(customerId, data)
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}

exports.createCustomer = (req, res) => {
  const {
    businessName: businessName,
    contactPersonName: contactPersonName,
    addressLine1: addressLine1,
    addressLine2: addressLine2,
    addressLineZipCode: addressLineZipCode,
    addressLineCity: addressLineCity,
    addressLineState: addressLineState,
    phoneNumber: phoneNumber,
    phoneCountryCode: phoneCountryCode,
    placeOfDelivery: placeOfDelivery,
    email: email,
    businessIdentityType: businessIdentityType,
    businessIdentityNumber: businessIdentityNumber,
  } = req.body

  const newRecord = new CustomerModel({
    businessName,
    contactPersonName,
    addressLine1,
    addressLine2,
    addressLineZipCode,
    addressLineCity,
    addressLineState,
    phoneNumber,
    phoneCountryCode,
    placeOfDelivery,
    email,
    businessIdentityType,
    businessIdentityNumber,
  })

  newRecord
    .save()
    .then((result) => {
      res.status(201).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}
