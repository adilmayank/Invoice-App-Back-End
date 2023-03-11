const { QuotationModel, InvoiceModel } = require('../Models')

exports.getAllQuotations = (req, res) => {
  const allRecords = QuotationModel.find({})
    .populate({
      path: 'quotationTo',
      select: 'businessName contactPersonName email paymentTerms',
    })
    .populate({ path: 'products.product' })

  allRecords
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

exports.getSingleQuotation = (req, res, next) => {
  const { quotationId } = req.params
  const singleRecord = QuotationModel.findById(quotationId)
    .populate({
      path: 'quotationTo',
      select: 'businessName contactPersonName email paymentTerms',
    })
    .populate({ path: 'products.product' })

  singleRecord
    .then((result) => {
      res.locals.responseData = result
      next()
      // res.status(200).json({ data: { result } })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

exports.updateSingleQuotation = (req, res) => {
  const { quotationId, quotationTo, products, taxComponents, quotationStatus } =
    req.body
  QuotationModel.findByIdAndUpdate(
    quotationId,
    {
      quotationTo,
      products,
      taxComponents,
      quotationStatus,
      modifiedOn: Date.now(),
    },
    { runValidators: true, new: true }
  )
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}

exports.createQuotation = async (req, res) => {
  const {
    quotationTo,
    taxComponents,
    // subTotal,
    // taxTotal,
    // grandTotal,
    // grandTotalInWords,
    products,
  } = req.body

  const quotationNumber = await createQuotationNumber()

  const newRecord = new QuotationModel({
    quotationTo,
    quotationNumber,
    taxComponents,
    // subTotal,
    // taxTotal,
    // grandTotal,
    // grandTotalInWords,
    products,
  })

  newRecord
    .save()
    .then((result) => {
      res.status(201).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name })
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
  const { quotationId, status } = req.query

  // promise chaining, finally one "catch" to catch errors, most probably validation error in this case ;)
  const queryResult = QuotationModel.findById(quotationId)
  queryResult
    .then((result) => {
      result.quotationStatus = status
      result.modifiedOn = Date.now()
      return result.save()
    })
    .then((data) => {
      res.status(200).json({ data: data })
    })
    .catch((err) => {
      res.status(500).json({ error: err.errors.name.errors.name })
    })
}

exports.downloadQuotation = (req, res) => {
  res.send(`Download Quotation : Not Implemented`)
}

exports.convertToInvoice = async (req, res) => {
  const { quotationId } = req.body
  let quotationResult = await QuotationModel.findById(quotationId)
  quotationResult.quotationStatus = 'convertedToInvoice'
  await quotationResult.save()
  const invoiceNumber = await createInvoiceNumber()
  new InvoiceModel({
    refQuotation: quotationId,
    invoiceNumber: invoiceNumber,
  })
    .save()
    .then((result) => {
      res.status(201).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
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
