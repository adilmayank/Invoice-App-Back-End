const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TransactionHistorySchema = new Schema({
  invoiceRefId: {
    type: Schema.Types.ObjectId,
    ref: 'Invoice',
    required: true,
  },
  amount: { type: Number, min: 0, required: true },
  remittanceId: { type: String, required: true, unique: true },
  paymentDate: { type: Date, required: true, default: Date.now() },
  type: {
    type: String,
    enum: ['debit', 'credit'],
    default: true,
    required: true,
  },
  comments: [{ type: String, maxlength: 50 }],
  createdOn: { type: Date, default: Date.now() },
  modifiedOn: { type: Date, default: Date.now() },
})

module.exports = new mongoose.model(
  'TransactionDetail',
  TransactionHistorySchema
)
