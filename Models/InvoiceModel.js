const mongoose = require('mongoose')
const Customer = require('./CustomersModel')

const { Schema } = mongoose

const InvoiceSchema = new Schema({
  refQuotation: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Quotation',
  },
  invoiceNumber: { type: String, index: true },
  invoiceDate: { type: Date, required: true, default: Date.now() },
  paymentDueDate: {
    type: Date,
    default: new Date(2023, new Date().getMonth() + 2, 0),
  },
  expectedDeliveryDate: { type: Date },
  discountComponent: [
    {
      discountType: { type: String },
      discountValue: { type: Number, min: 1 },
    },
  ],
  paymentHistory: [{ type: Schema.Types.ObjectId, ref: 'TransactionHistory' }],
  invoiceStatus: {
    type: String,
    enum: ['submitted', 'sent', 'notSubmitted'],
    default: 'notSubmitted',
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'partiallyPaid'],
    default: 'unpaid',
  },
  modifiedOn: { type: Date, default: Date.now() },
})

const InvoiceModel = new mongoose.model('Invoice', InvoiceSchema)

module.exports = InvoiceModel
