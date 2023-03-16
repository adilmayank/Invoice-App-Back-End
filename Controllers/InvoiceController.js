const {
  InvoiceModel,
  CustomerModel,
  QuotationModel,
  TransactionDetailModel,
} = require('../Models')

// Need to send proper status codes for all the responses

// Get all invoices need much less data than get single invoice, need to reduce the data later
exports.getAllInvoices = (req, res) => {
  const returningProperties =
    '_id invoiceNumber invoiceDate invoiceStatus paymentStatus'

  const allRecords = InvoiceModel.find({}, returningProperties)

  allRecords
    .then((result) => {
      if (!result) {
        res
          .status(200)
          .json({ data: null, msg: 'no record found', count: null })
      } else {
        res
          .status(200)
          .json({ data: result, msg: 'success', count: result.length })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err, msg: 'error' })
    })
}

exports.getSingleInvoice = (req, res, next) => {
  const invoiceReturningProperties = '-createdOn -modifiedOn -__v'
  const quotationReturningProperties = '_id quotationTo products taxComponents'
  const productReturningProperties =
    '_id name stockCode description unitPrice hsnNumber'
  const customerReturningProperties = 'businessName'

  const { invoiceId } = req.params
  const allRecords = InvoiceModel.findById(
    invoiceId,
    invoiceReturningProperties
  )
    .populate({
      path: 'quotationRefId',
      select: quotationReturningProperties,
      populate: [
        { path: 'quotationTo', select: customerReturningProperties },
        { path: 'products.product', select: productReturningProperties },
      ],
    })
    .populate({
      path: 'previousPayments',
    })

  allRecords
    .then((result) => {
      if (!result) {
        res.status(200).json({ data: null, msg: 'no record found' })
      } else {
        res.locals.responseData = result
        next()
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err, msg: 'error' })
    })
}

exports.updateSingleInvoice = (req, res) => {
  const { invoiceId, data } = req.body
  const { paymentDueDate, expectedDeliveryDate, discountComponent } = data

  const dataToSend = { paymentDueDate, expectedDeliveryDate, discountComponent }

  const allRecords = InvoiceModel.findOneAndUpdate(
    { _id: invoiceId },
    { ...dataToSend, modifiedOn: Date.now(), invoiceStatus: 'notSubmitted' },
    { new: true, runValidators: true }
  )
  allRecords
    .then((result) => {
      if (!result) {
        res.status(200).json({ data: null, msg: 'no record found' })
      } else {
        const { _id } = result
        res.status(200).json({ data: { _id }, msg: 'success' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, msg: 'error' })
    })
}

exports.convertInvoiceToQuotation = (req, res) => {
  // Get invoice id fron request
  // Get quotation id from query
  // Update quotation status to not sent
  // Delete current invoice from db by invoice Id

  const { invoiceId } = req.body

  InvoiceModel.findById(invoiceId).then((result) => {
    if (!result) {
      res.status(404).json({ data: null, msg: 'no record found' })
    } else {
      const quotationId = result.quotationRefId.toString()
      QuotationModel.findByIdAndUpdate(
        quotationId,
        {
          quotationStatus: 'notSent',
          modifiedOn: Date.now(),
        },
        { new: true, runValidators: true }
      ).then((quotationResult) => {
        if (!quotationResult) {
          res.status(404).json({ data: null, msg: 'no record found' })
        } else {
          InvoiceModel.findByIdAndDelete(invoiceId).then((deletedInvoice) => {
            if (!deletedInvoice) {
              res.status(404).json({ data: null, msg: 'no record found' })
            } else {
              res.status(200).json({ data: { quotationId }, msg: 'success' })
            }
          })
        }
      })
    }
  })

  // InvoiceModel.findById(invoiceId)
  //   .populate({
  //     path: 'quotationRefId',
  //   })
  //   .then((result) => {
  //     if (!result) {
  //       res.status(200).json({ data: null, msg: 'no record found' })
  //     } else {
  //       const quotationId = result.quotationRefId._id
  //       QuotationModel.findByIdAndUpdate(
  //         quotationId,
  //         { quotationStatus: 'notSent', modifiedOn: Date.now() },
  //         { runValidators: true, new: true }
  //       )
  //         .then((quotationResult) => {
  //           if (!quotationResult) {
  //             res.status(200).json({ data: null, msg: 'no record found' })
  //           } else {
  //             InvoiceModel.findByIdAndDelete(invoiceId)
  //             res.status(200).json({ data: { quotationId }, msg: 'success' })
  //           }
  //         })
  //         .catch((err) => {
  //           res.status(500).json({ error: err, msg: 'error' })
  //         })
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ error: err, msg: 'error' })
  //   })
}

exports.submitInvoice = (req, res) => {
  const { invoiceId } = req.body
  InvoiceModel.findByIdAndUpdate(
    invoiceId,
    { invoiceStatus: 'submitted', modifiedOn: Date.now() },
    { runValidators: true, new: true }
  )
    .then((result) => {
      if (!result) {
        res.status(200).json({ data: null, msg: 'no record found' })
      } else {
        const { _id, invoiceStatus } = result
        res.status(200).json({ data: { _id, invoiceStatus }, msg: 'success' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, msg: 'error' })
    })
}

// Only this is supposed to work in first version
exports.downloadInvoice = (req, res) => {
  res.send('Download Invoice : Not Implemented')
}

exports.sendInvoice = (req, res) => {
  const { invoiceId } = req.body

  // Step 1 - Fetch invoice data from db
  // Step 2 - Format data from query in an appropriate format
  // Step 3 - Call Email sender service to send email to customer
  // Step 4a - Upon success, update queried document's invoiceStatus to "send"
  // Step 4b - Upon failure, send the error with response body.

  // Below is an ad-hoc way to send the invoice to customer, which is not right !
  InvoiceModel.findByIdAndUpdate(
    invoiceId,
    {
      invoiceStatus: 'sent',
      invoiceSentOn: Date.now(),
      modifiedOn: Date.now(),
    },
    { runValidators: true, new: true }
  )
    .then((result) => {
      if (!result) {
        res.status(200).json({ data: null, msg: 'no record found' })
      } else {
        const { _id, invoiceStatus } = result
        res.status(200).json({ data: { _id, invoiceStatus }, msg: 'success' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, msg: 'error' })
    })
}

exports.submitAndSendInvoice = (req, res) => {
  const { invoiceId } = req.body
  InvoiceModel.findByIdAndUpdate(
    invoiceId,
    { invoiceStatus: 'sent', modifiedOn: Date.now() },
    { runValidators: true, new: true }
  )
    .then((result) => {
      if (!result) {
        res.status(200).json({ data: null, msg: 'no record found' })
      } else {
        const { _id, invoiceStatus } = result
        res.status(200).json({ data: { _id, invoiceStatus }, msg: 'success' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, msg: 'error' })
    })
}
