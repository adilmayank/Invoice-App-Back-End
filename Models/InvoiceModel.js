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
      discountValue: { type: Number },
    },
  ],
  previousDeposits: [
    { amount: { type: Number, min: 0 }, paymentDate: { type: Date } },
  ],
  invoiceTotal: { type: Number, min: 0, required: true },
  grandTotalInWords: { type: String, required: true },
  // paymentHistory: [{ type: Schema.Types.ObjectId, ref: 'PaymentTransactions' }],
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
