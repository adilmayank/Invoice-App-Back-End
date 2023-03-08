const { InvoiceModel, CustomerModel } = require('../Models')

// Need to send proper status codes for all the responses

exports.getAllInvoices = (req, res) => {
  const allRecords = InvoiceModel.find({}).populate({
    path: 'refQuotation',
    populate: { path: 'quotationTo' },
  })

  allRecords
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

exports.getSingleInvoice = (req, res) => {
  const invoiceId = req.params.id
  const allRecords = InvoiceModel.find({ _id: invoiceId }).populate({
    path: 'refQuotation',
    populate: { path: 'quotationTo' },
  })

  allRecords
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

exports.updateSingleInvoice = (req, res) => {
  const { invoiceId, data } = req.body

  const allRecords = InvoiceModel.findOneAndUpdate(
    { _id: invoiceId },
    { ...data, modifiedOn: Date.now() }
  )
  allRecords
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name })
    })
}

exports.convertInvoiceToEstimate = (req, res) => {
  res.send('Convert To Estimate : Not Implemented')
}

exports.submitInvoice = (req, res) => {
  const invoiceId = req.body.id
  updateInvoiceStatus(invoiceId, 'submitted')
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name })
    })
}

exports.downloadInvoice = (req, res) => {
  console.log(req.body)
  res.send('Download Invoice : Not Implemented')
}

exports.sendInvoice = (req, res) => {
  const invoiceId = req.body.id
  updateInvoiceStatus(invoiceId, 'sent')
    .then((result) => {
      res.status(200).json({ data: result, msg: 'Invoice sent to customer.' })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name })
    })
}

exports.submitAndSendInvoice = (req, res) => {
  const invoiceId = req.body.id
  updateInvoiceStatus(invoiceId, 'sent')
    .then((result) => {
      res.status(200).json({
        data: result,
        msg: 'Invoice submitted and sent to the customer.',
      })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name })
    })
}

exports.updatePaymentStatus = (req, res) => {
  const paymentStatus = req.body.paymentStatus
  const invoiceId = req.body.invoiceId

  InvoiceModel.findByIdAndUpdate(
    invoiceId,
    { paymentStatus: paymentStatus, modifiedOn: Date.now() },
    { new: true }
  )
    .then((result) => {
      res.status(200).json({
        data: result,
        msg: `Invoice payment Status : ${result.paymentStatus}`,
      })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name })
    })
}

exports.updateInvoiceStatus = (req, res) => {
  const { invoiceId, status } = req.query

  InvoiceModel.findByIdAndUpdate(
    invoiceId,
    { invoiceStatus: status, modifiedOn: Date.now() },
    { runValidators: true, new: true }
  )
    .then((result) => {
      res.status(201).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name })
    })
}
