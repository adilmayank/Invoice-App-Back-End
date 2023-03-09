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

exports.convertInvoiceToQuotation = (req, res) => {
  res.send('Convert To Quotation : Not Implemented')
}

exports.submitInvoice = (req, res) => {
  const invoiceId = req.body.id
  InvoiceModel.findByIdAndUpdate(
    invoiceId,
    { invoiceStatus: 'submitted', modifiedOn: Date.now() },
    { runValidators: true, new: true }
  )
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name })
    })
}

exports.downloadInvoice = (req, res) => {
  res.send('Download Invoice : Not Implemented')
}

exports.sendInvoice = (req, res) => {
  const invoiceId = req.body.id

  // Step 1 - Fetch invoice data from db
  // Step 2 - Format data from query in an appropriate format
  // Step 3 - Call Email sender service to send email to customer
  // Step 4a - Upon success, update queried document's invoiceStatus to "send"
  // Step 4b - Upon failure, send the error with response body.

  // Below is an ad-hoc way to send the invoice to customer, which is not right !
  InvoiceModel.findByIdAndUpdate(
    invoiceId,
    { invoiceStatus: 'sent', modifiedOn: Date.now() },
    { runValidators: true, new: true }
  )
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name })
    })
}

exports.submitAndSendInvoice = (req, res) => {
  const invoiceId = req.body.id
  InvoiceModel.findByIdAndUpdate(
    invoiceId,
    { invoiceStatus: 'sent', modifiedOn: Date.now() },
    { runValidators: true, new: true }
  )
    .then((result) => {
      res.status(200).json({ data: result, msg: "Quotation sent to the cusotmer" })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name })
    })
}

exports.removePaymentDetails = async (req, res) => {
  const { invoiceId, paymentId } = req.body

  await InvoiceModel.findById(invoiceId)
    .then((queryResult) => {
      const filteredPayments = queryResult.previousDeposits.filter((item) => {
        if (!item._id.equals(paymentId)) {
          return item
        }
      })
      queryResult.previousDeposits = [...filteredPayments]
      queryResult.modifiedOn = Date.now()
      return queryResult.save()
    })
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

exports.addPaymentDetails = async (req, res) => {
  const { paymentDetails, invoiceId } = req.body
  paymentDetails.paymentDate = new Date(paymentDetails.paymentDate)

  await InvoiceModel.findById(invoiceId)
    .then((queryResult) => {
      queryResult.previousDeposits.push({ ...paymentDetails })
      // queryResult.previousDeposits = []
      queryResult.modifiedOn = Date.now()
      return queryResult.save()
    })
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name })
    })
}
