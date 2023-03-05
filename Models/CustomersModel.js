const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CustomerSchema = new Schema({
  business_name: { type: String, required: true, maxLength: 50 },
  contact_person_name: { type: String, required: true, maxLength: 50 },
  address_line_1: { type: String, required: true, maxLength: 100 },
  address_line_2: { type: String, maxLength: 50 },
  address_line_zip_code: { type: Number, required: true, maxLength: 10 },
  address_line_city: { type: String, required: true, maxLength: 20 },
  address_line_state: { type: String, required: true, maxLength: 20 },
  phone_number: { type: Number, required: true },
  phone_country_code: { type: String, required: true },
  place_of_delivery: {
    type: String,
    required: false,
    maxLength: 20,
    default: this.address_line_city,
  },
  email: { type: String, required: true },
  business_identity_type: { type: String, required: true },
  business_identity_number: { type: String, required: true, unique: true },
  payment_terms: {
    type: String,
    enum: ['COD', 'CBD', 'EOM', 'CIA', 'PIA', '7D', '14D', '1M'],
    default: 'CIA',
  },
})

module.exports = new mongoose.model('Customers', CustomerSchema)
