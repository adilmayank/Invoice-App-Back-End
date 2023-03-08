const mongoose = require('mongoose')
const Customer = require('./CustomersModel')

const { Schema } = mongoose

const QuotationSchema = new Schema({
  quotationTo: {
    type: Schema.Types.ObjectId,
    ref: 'Customers',
    required: true,
  },
  quotationNumber: { type: String, index: true, required: true },
  quotationDate: { type: Date, required: true, default: Date.now() },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  taxComponents: {
    taxName: [{ type: String, required: true }],
    taxRate: [{ type: Number, required: true, min: 0, max: 100 }],
    taxValue: [{ type: Number, required: true, min: 0 }],
  },
  subTotal: { type: Number, required: true, min: 0 },
  taxTotal: { type: Number, required: true, min: 0 },
  grandTotal: { type: Number, required: true, min: 0 },
  grandTotalInWords: { type: String, required: true },
  quotationStatus: {
    type: String,
    enum: ['accepted', 'rejected', 'notSent', 'sent', 'underNegotiation'],
    default: 'notSent',
  },
  modifiedOn: { type: Date, default: Date.now() },
})

const QuotationModel = new mongoose.model('Quotation', QuotationSchema)

module.exports = QuotationModel
