const mongoose = require('mongoose')
const Customer = require('./CustomersModel')

const { Schema } = mongoose

const InvoiceSchema = new Schema({
  invoiceTo: { type: Schema.Types.ObjectId, ref: 'Customers' },
  // piNumber: {type: Schema.Type.ObjectId, required: true, ref: "Estimate"},
  invoiceNumber: { type: String, index: true },
  invoiceDate: { type: Date, required: true, default: Date.now() },
  // paymentTerms: { type: String, required: true },
  paymentDueDate: {
    type: Date,
    default: new Date(2023, new Date().getMonth() + 2, 0),
  },
  expectedDeliveryDate: { type: Date },
  // products: [{type: Schema.Types.ObjectId, ref: "Product", required: true}]
  taxComponentTypes: [{ type: String, required: true }],
  taxComponentRates: [{ type: Number, required: true, min: 0, max: 100 }],
  taxComponentValue: [{ type: Number, required: true, min: 0 }],
  subTotal: { type: Number, required: true, min: 0 },
  taxTotal: { type: Number, required: true, min: 0 },
  discountTypes: [{ type: String }],
  discountValues: [{ type: Number, min: 0 }],
  previousDeposits: [{ type: Number, min: 0 }],
  grandTotal: { type: Number, required: true, min: 0 },
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
  lastModifiedOn: { type: Date, default: Date.now() },
})

const InvoiceModel = new mongoose.model('Invoice', InvoiceSchema)

module.exports = InvoiceModel
