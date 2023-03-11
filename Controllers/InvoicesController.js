const {
  InvoiceModel,
  CustomerModel,
  QuotationModel,
  TransactionHistoryModel,
} = require('../Models')

// Need to send proper status codes for all the responses

// Get all invoices need much less data than get single invoice, need to reduce the data later
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

exports.getSingleInvoice = (req, res, next) => {
  const invoiceId = req.params.id
  const allRecords = InvoiceModel.find({ _id: invoiceId })
    .populate({
      path: 'refQuotation',
      populate: { path: 'quotationTo' },
      populate: { path: 'products.product' },
    })
    .populate({
      path: 'paymentHistory',
    })
  // .populate({
  //   path: "products.product"
  // })

  allRecords
    .then((result) => {
      res.locals.responseData = result
      next()
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
    { ...data, modifiedOn: Date.now(), invoiceStatus: 'notSubmitted' },
    { new: true, runValidators: true }
  )
  allRecords
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name })
    })
}

exports.convertInvoiceToQuotation = async (req, res) => {
  // Get invoice id fron request
  // Get quotation id from query
  // Update quotation status to not accepted
  // Delete current invoice from db by invoice Id

  const { invoiceId } = req.body
  console.log(`Invoice Id: ${invoiceId}`)
  const quotationQuery = await InvoiceModel.findById(invoiceId).populate({
    path: 'refQuotation',
  })
  const quotationId = quotationQuery.refQuotation._id
  console.log(`Quotation Id: ${quotationId}`)

  await QuotationModel.findByIdAndUpdate(
    quotationId,
    { quotationStatus: 'notSent', modifiedOn: Date.now() },
    { runValidators: true, new: true }
  )
  console.log('quotation status upated')
  await InvoiceModel.findByIdAndDelete(invoiceId)
  console.log('invoice deleted')

  res.json({
    msg: 'Invoice converted to Quotation, current invoice record deleted',
  })
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

exports.removePaymentHistoryItem = (req, res) => {
  const { invoiceId, transactionDetailId } = req.body
  console.log(invoiceId, transactionDetailId)

  InvoiceModel.findById(invoiceId).then((result) => {
    result.paymentHistory.pull(transactionDetailId)
    TransactionHistoryModel.findByIdAndRemove(transactionDetailId)
      .then((result2) => {
        result.save().then(() => {
          res.status(200).json({ data: result })
        })
      })
      .catch((err) => {
        res.status(500).json({ error: err })
      })
  })
}

// Only this is supposed to work in first version
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
      res
        .status(200)
        .json({ data: result, msg: 'Quotation sent to the cusotmer' })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name })
    })
}
