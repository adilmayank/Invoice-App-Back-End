const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, maxLength: 100 },
  unitPrice: { type: Number, required: true, min: 0 },
  hsnNumber: { type: Number },
  createdOn: { type: Date, default: Date.now() },
  modifiedOn: { type: Date, default: Date.now() },
})

module.exports = new mongoose.model('Product', ProductSchema)
