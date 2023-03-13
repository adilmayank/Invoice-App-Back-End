const { ProductModel } = require('../Models')

exports.getAllProducts = (req, res) => {
  ProductModel.find({})
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}

exports.getSingleProduct = (req, res) => {
  const { productId } = req.params
  ProductModel.findById(productId)
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}

exports.updateSingleProduct = (req, res) => {
  const { productId, data } = req.body
  for (key of Object.keys(data)) {
    if (data[key] === undefined || data[key] === null) {
      delete data[key]
    }
  }
  ProductModel.findByIdAndUpdate(
    productId,
    { ...data, modifiedOn: Date.now() },
    { runValidators: true, new: true }
  )
    .then((result) => {
      res.status(201).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}

exports.deleteSingleProduct = (req, res) => {
  const { productId } = req.body

  ProductModel.findByIdAndRemove(productId)
    .then((result) => {
      res.status(201).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}

exports.createProduct = (req, res) => {
  const { data } = req.body
  const newProduct = new ProductModel({ ...data })
  newProduct
    .save()
    .then((result) => {
      res.status(201).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}
