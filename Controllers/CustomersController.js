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
    business_name: business_name,
    contact_person_name: contact_person_name,
    address_line_1: address_line_1,
    address_line_2: address_line_2,
    address_line_zip_code: address_line_zip_code,
    address_line_city: address_line_city,
    address_line_state: address_line_state,
    phone_number: phone_number,
    phone_country_code: phone_country_code,
    place_of_delivery: place_of_delivery,
    email: email,
    business_identity_type: business_identity_type,
    business_identity_number: business_identity_number,
  } = req.body

  const newRecord = new CustomerModel({
    business_name,
    contact_person_name,
    address_line_1,
    address_line_2,
    address_line_zip_code,
    address_line_city,
    address_line_state,
    phone_number,
    phone_country_code,
    place_of_delivery,
    email,
    business_identity_type,
    business_identity_number,
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
