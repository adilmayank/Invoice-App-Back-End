const { QuotationModel, InvoiceModel } = require('../Models')
const { QuotationAggregate } = require('../utils')

exports.getAllQuotations = (req, res) => {
  const quotationReturningProperties =
    '_id quotationTo quotationNumber quotationDate quotationStatus'
  const customerReturningProperties = 'businessName'

  const allRecords = QuotationModel.find(
    {},
    quotationReturningProperties
  ).populate({
    path: 'quotationTo',
    select: customerReturningProperties,
  })
  // .populate({ path: 'products.product' })

  allRecords
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

exports.getSingleQuotation = (req, res, next) => {
  const quotationReturningProperties =
    '_id quotationTo quotationNumber quotationDate quotationStatus products taxComponents emailSentOn'
  const customerReturningProperties = '_id businessName'
  const productReturningProperties =
    '_id name stockCode description unitPrice hsnNumber'
  const { quotationId } = req.params
  const singleRecord = QuotationModel.findById(
    quotationId,
    quotationReturningProperties
  )
    .populate({
      path: 'quotationTo',
      select: customerReturningProperties,
    })
    .populate({ path: 'products.product', select: productReturningProperties })
    .lean()

  singleRecord
    .then((result) => {
      if (!result) {
        res.status(200).json({ data: null, msg: 'not record found' })
      } else {
        QuotationAggregate(result)
        res.json({ data: result, msg: 'success' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, msg: 'error' })
    })
}

exports.updateSingleQuotation = async (req, res) => {
  const {
    quotationId,
    data: { quotationTo, products, taxComponents },
  } = req.body

  // Add extra step of validation for quotation Ids and product Ids.
  // Not implementing it yet.

  QuotationModel.findByIdAndUpdate(
    quotationId,
    {
      quotationTo,
      products,
      taxComponents,
      modifiedOn: Date.now(),
    },
    { runValidators: true, new: true }
  )
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

exports.createQuotation = async (req, res) => {
  const { data } = req.body
  const { quotationTo, products, taxComponents } = data

  const quotationNumber = await createQuotationNumber()

  const newRecord = new QuotationModel({
    quotationTo,
    quotationNumber,
    taxComponents,
    products,
  })

  newRecord
    .save()
    .then((result) => {
      if (!result) {
        res.status(201).json({ data: null, msg: 'no record found' })
      } else {
        const { _id } = result
        res.status(201).json({ data: { _id }, msg: 'success' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, msg: 'error' })
    })
}

// helper function to create an auto-increment quotation number for each quotation generated
const createQuotationNumber = async () => {
  let result
  await QuotationModel.countDocuments({})
    .then((count) => {
      result = `QUOT-${10000 + count + 1}`
    })
    .catch((err) => {
      throw new Error(err)
    })
  return result
}

exports.updateQuotationStatus = (req, res) => {
  const { quotationId, data } = req.body

  // changing quotation status is just indicative of a state change.
  const { quotationStatus } = data

  if (quotationStatus === 'convertedToInvoice') {
    res
      .status(400)
      .json({ data: null, msg: 'can not convert to invoice like this' })
  } else {
    // Updating the quotation status and sending response back to client
    QuotationModel.findByIdAndUpdate(
      quotationId,
      {
        quotationStatus,
        modifiedOn: Date.now(),
      },
      { new: true, runValidators: true }
    )
      .then((result) => {
        if (!result) {
          res.status(200).json({ data: null, msg: 'no record found' })
        } else {
          const { _id, quotationStatus: updatedQuotationStatus } = result
          const returningProperties = { _id, updatedQuotationStatus }
          res.status(200).json({ data: returningProperties, msg: 'success' })
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err, msg: 'error' })
      })
  }
}

exports.downloadQuotation = (req, res) => {
  res.status(200).json({ data: 'Download Quotation is not implemented.' })
}

exports.sendQuotation = (req, res) => {
  const { quotationId } = req.body

  // Create quoatation pdf
  // Call some asynchronous service to send the quotation to client
  // After email is successfully send to the client,
  // Update emailSentOn to current datetime then,
  // Send response to back to caller

  QuotationModel.findByIdAndUpdate(
    quotationId,
    {
      quotationStatus: 'sent',
      emailSentOn: Date.now(),
    },
    { new: true, runValidators: true }
  )
    .then((result) => {
      if (!result) {
        res.status(200).json({ data: null, msg: 'no record found' })
      } else {
        const { _id, quotationStatus } = result
        const returningProperties = { _id, quotationStatus }
        res.status(200).json({ data: returningProperties, msg: 'success' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, msg: 'error' })
    })
}

exports.convertToInvoice = async (req, res) => {
  const { quotationId } = req.body

  // Step 1 - Check whether the invoice Id for refernce actually exists or not.
  // Not implmemented yet

  // Step 2 - Check whether an invoice already refers to this quotationId
  const doesQuotationAlreadyInvoiced = await InvoiceModel.findOne({
    quotationRefId: quotationId,
  })
  // DoesQuotationAlreadyInvoiced can not check the validity of the quotation Id itself
  // This is to be done at step 1
  if (doesQuotationAlreadyInvoiced) {
    res
      .status(200)
      .json({ data: null, msg: 'quotation already converted to invoice' })
  } else {
    QuotationModel.findByIdAndUpdate(
      quotationId,
      { quotationStatus: 'convertedToInvoice' },
      { new: true, runValidators: true }
    ).catch((err) => {
      res.status(500).json({ error: err, msg: 'error' })
    })
    const invoiceNumber = await createInvoiceNumber()
    new InvoiceModel({
      quotationRefId: quotationId,
      invoiceNumber: invoiceNumber,
    })
      .save()
      .then((result) => {
        const { _id } = result
        res.status(201).json({ data: { invoiceId: _id }, msg: 'success' })
      })
      .catch((err) => {
        res.status(500).json({ error: err, msg: 'error' })
      })
  }
}

const createInvoiceNumber = async () => {
  let result
  await InvoiceModel.countDocuments({})
    .then((count) => {
      result = `INV-${10000 + count + 1}`
    })
    .catch((err) => {
      throw new Error(err)
    })
  return result
}

exports.deleteQuotation = (req, res) => {
  res.status(200).json({ data: 'Deleted Quotation is not implemented yet' })
}
