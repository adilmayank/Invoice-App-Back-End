const { CustomerModel } = require('../Models')

exports.getAllCustomers = (req, res) => {
  const propertiesToReturn = '_id businessName contactPersonName'
  const allRecords = CustomerModel.find({}, propertiesToReturn)
  allRecords
    .then((result) => {
      if (!result) {
        res.status(200).json({ data: null, msg: 'no records found', count: 0 })
      } else {
        res
          .status(200)
          .json({ data: result, msg: 'success', count: result.length })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, msg: 'error' })
    })
}

exports.getSingleCustomer = (req, res) => {
  const { customerId } = req.params
  const propertiesToReturn = '-createdOn -modifiedOn -__v'
  const singleRecord = CustomerModel.findById(customerId, propertiesToReturn)
  singleRecord
    .then((result) => {
      if (!result) {
        res.status(200).json({ data: null, msg: 'no record found' })
      } else {
        res.status(200).json({ data: result, msg: 'success' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, msg: 'error' })
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
    paymentTerms: data.paymentTerms,
    businessIdentityType: data.businessIdentityType,
    businessIdentityNumber: data.businessIdentityNumber,
  }

  CustomerModel.findByIdAndUpdate(
    customerId,
    { ...dataToSubmit, modifiedOn: Date.now() },
    { runValidators: true, new: true }
  )
    .then((result) => {
      if (!result) {
        res.status(200).json({ data: null, msg: 'no record found' })
      } else {
        const { _id, businessName } = result
        res.status(200).json({ data: { _id, businessName }, msg: 'success' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, msg: 'error' })
    })
}

exports.deleteSingleCustomer = (req, res) => {
  const { customerId } = req.body

  CustomerModel.findByIdAndRemove(customerId)
    .then((result) => {
      if (!result) {
        res.status(200).json({ data: null, msg: 'no record found' })
      } else {
        res.status(200).json({ data: result, msg: 'success' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, msg: 'error' })
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
    paymentTerms: paymentTerms,
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
    paymentTerms,
    businessIdentityType,
    businessIdentityNumber,
  })

  newRecord
    .save()
    .then((result) => {
      const { _id, businessName } = result
      res.status(201).json({ data: { _id, businessName }, msg: 'success' })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err, msg: 'error' })
    })
}
  