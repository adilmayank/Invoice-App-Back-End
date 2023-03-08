const { ProductModel } = require('../Models')

exports.getAllProducts = (req, res) => {
  ProductModel.find({})
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name })
    })
}

exports.getSingleProduct = (req, res) => {
  const { id: productId } = req.params
  ProductModel.findById(productId)
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name })
    })
}

exports.updateSingleProduct = (req, res) => {
  const { id, data } = req.body
  for (key of Object.keys(data)) {
    if (data[key] === undefined || data[key] === null) {
      delete data[key]
    }
  }
  ProductModel.findByIdAndUpdate(
    id,
    { ...data, modifiedOn: Date.now() },
    { runValidators: true, new: true }
  )
    .then((result) => {
      res.status(201).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name })
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
      res.status(500).json({ Error: err.errors.description })
    })
}
