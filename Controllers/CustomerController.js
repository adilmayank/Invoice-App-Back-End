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
  const { customerId } = req.params

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
  const { customerId, data } = req.body

  const dataToSubmit = {
    businessName: data.businessName,
    contactPersonName: data.contactPersonName,
    addressLine1: data.addressLine1,
    addressLine2: data.addressLine2,
    addressLineZipCode: data.addressLineZipCode,
    addressLineCity: data.addressLineCity,
    addressLineState: data.addressLineState,
    phoneNumber: data.phoneNumber,
    phoneCountryCode: data.phoneCountryCode,
    placeOfDelivery: data.placeOfDelivery,
    email: data.email,
    businessIdentityType: data.businessIdentityType,
    businessIdentityNumber: data.businessIdentityNumber,
  }

  CustomerModel.findByIdAndUpdate(
    customerId,
    { ...dataToSubmit, modifiedOn: Date.now() },
    { runValidators: true, new: true }
  )
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}

exports.deleteSingleCustomer = (req, res) => {
  const { customerId } = req.body

  CustomerModel.findByIdAndRemove(customerId)
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}

exports.createSingleCustomer = (req, res) => {
  const { data } = req.body

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
  } = data

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
      console.log(err)
      res.status(500).json({ error: err })
    })
}
