const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CustomerSchema = new Schema({
  businessName: { type: String, required: true, maxLength: 50 },
  contactPersonName: { type: String, required: true, maxLength: 50 },
  addressLine1: { type: String, required: true, maxLength: 100 },
  addressLine2: { type: String, maxLength: 50 },
  addressLineZipCode: { type: Number, required: true, maxLength: 10 },
  addressLineCity: { type: String, required: true, maxLength: 20 },
  addressLineState: { type: String, required: true, maxLength: 20 },
  phoneNumber: { type: Number, required: true },
  phoneCountryCode: { type: String, required: true },
  placeOfDelivery: {
    type: String,
    required: false,
    maxLength: 20,
    default: this.addressLineCity,
  },
  email: { type: String, required: true },
  businessIdentityType: { type: String, required: true },
  businessIdentityNumber: { type: String, required: true, unique: true, dropDups: true },
  paymentTerms: {
    type: String,
    enum: ['COD', 'CBD', 'EOM', 'CIA', 'PIA', '7D', '14D', '1M'],
    default: 'CIA',
  },
  createdOn: {type: Date, default: Date.now()},
  modifiedOn: {type: Date, default: Date.now()},
})

module.exports = new mongoose.model('Customer', CustomerSchema)
