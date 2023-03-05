exports.getAllProducts = (req, res) => {
  res.send(`Get All Products : Not Implemented`)
}

exports.getSingleProduct = (req, res) => {
  res.send(`Get Single Product : ${req.params.id} : Not Implemented`)
}

exports.updateSingleProduct = (req, res) => {
  const data = req.body
  const customerId = req.params.id
  res.send({ customerId, data })
}

exports.createProduct = (req, res) => {
  const data = req.body
  res.json({ data: data })
}
