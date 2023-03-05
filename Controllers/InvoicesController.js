exports.getAllInvoices = (req, res) => {
  res.send(`Get All Invoices : Not Implemented`)
}

exports.getSingleInvoice = (req, res) => {
  res.send(`Get Single Invoice : ${req.params.id} : Not Implemented`)
}

exports.updateSingleInvoice = (req, res) => {
  const data = req.body
  const invoiceId = req.params.id
  res.send({ invoiceId, data })
}

exports.createInvoice = (req, res) => {
  const data = req.body
  res.json({ data: data })
}

exports.convertInvoiceToEstimate = (req, res) => {
  res.send('Convert Invoice To Estimate : Not Implemented')
}
