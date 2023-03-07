const { InvoiceModel, CustomerModel } = require('../Models')

exports.getAllInvoices = (req, res) => {
  const allRecords = InvoiceModel.find({}).populate(
    'invoiceTo',
    'businessName paymentTerms'
  )

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
  const allRecords = InvoiceModel.find({ _id: invoiceId }).populate(
    'invoiceTo',
    'businessName paymentTerms'
  )

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
    { ...data, lastModifiedOn: Date.now() }
  )
  allRecords
    .then((result) => {
      res.json({ data: result })
    })
    .catch((err) => {
      res.json({ err })
    })
}

exports.createInvoice = async (req, res) => {
  const {
    invoiceTo: invoiceTo,
    paymentTerms: paymentTerms,
    taxComponentTypes: taxComponentTypes,
    taxComponentRates: taxComponentRates,
    taxComponentValue: taxComponentValue,
    subTotal: subTotal,
    taxTotal: taxTotal,
    discountTypes: discountTypes,
    discountValues: discountValues,
    previousDeposits: previousDeposits,
    grandTotal: grandTotal,
    grandTotalInWords: grandTotalInWords,
  } = req.body

  const invoiceNumber = await createInvoiceNumber()

  const newRecord = new InvoiceModel({
    invoiceTo,
    paymentTerms,
    invoiceNumber,
    taxComponentTypes,
    taxComponentRates,
    taxComponentValue,
    subTotal,
    taxTotal,
    discountTypes,
    discountValues,
    previousDeposits,
    grandTotal,
    grandTotalInWords,
  })

  newRecord
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

const updateInvoiceStatus = async (id, status) => {
  const queryResult = await InvoiceModel.findByIdAndUpdate(
    id,
    { invoiceStatus: status, lastModifiedOn: Date.now() },
    { new: true }
  )
  return queryResult
}

const updatePaymentStatus = async (id, status) => {
  const queryResult = await InvoiceModel.findByIdAndUpdate(
    id,
    { paymentStatus: status, lastModifiedOn: Date.now() },
    { new: true }
  )
  return queryResult
}

exports.convertInvoiceToEstimate = (req, res) => {
  res.send('Convert To Estimate : Not Implemented')
}

exports.submitInvoice = (req, res) => {
  const invoiceId = req.body.id
  updateInvoiceStatus(invoiceId, 'submitted')
    .then((result) => {
      res.json({ data: result })
    })
    .catch((err) => {
      throw new Error(err)
    })
}

exports.downloadInvoice = (req, res) => {
  res.send('Download Invoice : Not Implemented')
}

exports.sendInvoice = (req, res) => {
  const invoiceId = req.body.id
  updateInvoiceStatus(invoiceId, 'sent')
    .then((result) => {
      res.json({ data: result, msg: 'Invoice sent to customer.' })
    })
    .catch((err) => {
      throw new Error(err)
    })
}

exports.submitAndSendInvoice = (req, res) => {
  const invoiceId = req.body.id
  updateInvoiceStatus(invoiceId, 'sent')
    .then((result) => {
      res.json({
        data: result,
        msg: 'Invoice submitted and sent to the customer.',
      })
    })
    .catch((err) => {
      throw new Error(err)
    })
}

exports.updatePaymentStatus = (req, res) => {
  const paymentStatus = req.body.paymentStatus
  const invoiceId = req.body.invoiceId

  updatePaymentStatus(invoiceId, paymentStatus)
    .then((result) => {
      res.json({
        data: result,
        msg: `Invoice payment Status : ${result.paymentStatus}`,
      })
    })
    .catch((err) => {
      throw new Error(err)
    })
}
