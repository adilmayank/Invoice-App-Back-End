const { TransactionHistoryModel, InvoiceModel } = require('../Models')

// Get all transaction detail
exports.getAllTransactionDetails = (req, res) => {
  TransactionHistoryModel.find({})
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}

// Get single transaction detail
exports.getSingleTransactionDetail = (req, res) => {
  const { transactionId } = req.body
  TransactionHistoryModel.findById(transactionId)
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}

// Add/Create transaction detail
exports.addTransactionDetail = async (req, res) => {
  // Fetching data from request body
  const { data } = req.body

  const { invoiceRefId, amount, remittanceId, type } = data

  // Constructing and saving a new transaction detail in db
  const newTransactionDetail = await new TransactionHistoryModel({
    invoiceRefId,
    amount,
    remittanceId,
    type,
  }).save()

  // Getting the object id of the newly created document
  const transactionDetailId = newTransactionDetail._id

  // Pushing the transaction detail id to the Payment History subdocument of the appropriate Invoice Document
  const InvoiceQueryResult = await InvoiceModel.findById(invoice)
  InvoiceQueryResult.paymentHistory.push(transactionDetailId)

  // Saving the Invoice document
  await InvoiceQueryResult.save()

  res.status(201).json({ data: newTransactionDetail })
  // res.send('Payment history created.')
}

// Update transaction detail
exports.updateTransactionDetail = (req, res) => {
  const { transactionId, data } = req.body

  for (key of Object.keys(data)) {
    if (key == 'invoiceRefId') {
      delete data[key]
    }
  }

  TransactionHistoryModel.findByIdAndUpdate(transactionId, {
    ...data,
    modifiedOn: Date.now(),
  })
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}
