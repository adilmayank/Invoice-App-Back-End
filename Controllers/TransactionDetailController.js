const { TransactionDetailModel, InvoiceModel } = require('../Models')

// Get all transaction detail
exports.getAllTransactionDetails = (req, res) => {
  TransactionDetailModel.find({})
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
  TransactionDetailModel.findById(transactionId)
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
  const newTransactionDetail = await new TransactionDetailModel({
    invoiceRefId,
    amount,
    remittanceId,
    type,
  }).save()

  res.status(201).json({ data: newTransactionDetail })
  // res.send('Payment history created.')
}

// Update transaction detail
exports.updateTransactionDetail = (req, res) => {
  const { transactionDetailId, data } = req.body

  for (key of Object.keys(data)) {
    if (key == 'invoiceRefId') {
      delete data[key]
    }
  }

  TransactionDetailModel.findByIdAndUpdate(
    transactionDetailId,
    {
      ...data,
      modifiedOn: Date.now(),
    },
    { new: true, runValidators: true }
  )
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}

// Delete transaction detail
exports.deleteTransactionDetail = (req, res) => {
  const { transactionDetailId } = req.body

  TransactionDetailModel.findByIdAndRemove(transactionDetailId)
    .then((result) => {
      res.status(200).json({ data: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}
