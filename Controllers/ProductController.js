const { ProductModel } = require('../Models')

exports.getAllProducts = (req, res) => {
  const returningProperties = '_id stockCode name'
  ProductModel.find({}, returningProperties)
    .then((result) => {
      if (!result) {
        res
          .status(200)
          .json({ data: null, msg: 'no records found', count: null })
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

exports.getSingleProduct = (req, res) => {
  const { productId } = req.params
  const returningProperties =
    '_id stockCode name description unitPrice hsnNumber'
  ProductModel.findById(productId, returningProperties)
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

exports.updateSingleProduct = (req, res) => {
  const {
    productId,
    data: { name, stockCode, description, unitPrice, hsnNumber },
  } = req.body

  // creating custom data object to feed to update
  const data = { ...name, stockCode, description, unitPrice, hsnNumber }
  ProductModel.findByIdAndUpdate(
    productId,
    { ...data, modifiedOn: Date.now() },
    { runValidators: true, new: true }
  )
    .then((result) => {
      if (!result) {
        res.status(200).json({ data: null, msg: 'no record found' })
      } else {
        const { _id } = result
        res.status(200).json({ data: { productId: _id }, msg: 'success' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, msg: 'error' })
    })
}

exports.deleteSingleProduct = (req, res) => {
  const { productId } = req.body

  ProductModel.findByIdAndRemove(productId)
    .then((result) => {
      if (!result) {
        res.status(200).json({ data: null, msg: 'no record found' })
      } else {
        const { name, stockCode } = result
        res.status(200).json({ data: { name, stockCode }, msg: 'success' })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err, msg: 'error' })
    })
}

exports.createProduct = (req, res) => {
  const { data } = req.body
  const newProduct = new ProductModel({ ...data })
  newProduct
    .save()
    .then((result) => {
      const { _id } = result
      res.status(201).json({ data: { productId: _id }, msg: 'success' })
    })
    .catch((err) => {
      res.status(500).json({ error: err, msg: 'error' })
    })
}
