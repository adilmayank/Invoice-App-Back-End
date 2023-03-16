const { TransactionDetailModel, InvoiceModel } = require('../Models')

// Get all transaction detail
exports.getAllTransactionDetails = (req, res) => {
  const returningProperties = '_id invoiceRefId amount type paymentDate'
  TransactionDetailModel.find({}, returningProperties)
    .then((result) => {
      if (!result) {
        res.status(200).json({ data: null, msg: 'no records found', count: 0 })
      } else {
        res
          .status(200)
          .json({ data: result, msg: 'success', count: result.length })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}

// Get single transaction detail
exports.getSingleTransactionDetail = (req, res) => {
  const { transactionId } = req.params
  const returningProperties =
    '_id invoiceRefId amount remittanceId paymentDate type comments'
  TransactionDetailModel.findById(transactionId, returningProperties)
    .then((result) => {
      if (!result) {
        res.status(200).json({ data: null, msg: 'no record found' })
      } else {
        res.status(200).json({ data: result, msg: 'success' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, msg: 'error' })
    })
}

// Add/Create transaction detail
exports.addTransactionDetail = (req, res) => {
  // Fetching data from request body
  const { data } = req.body

  const { invoiceRefId, amount, remittanceId, type } = data

  // Constructing and saving a new transaction detail in db
  const newRecord = new TransactionDetailModel({
    invoiceRefId,
    amount,
    remittanceId,
    type,
  }).save()
  newRecord
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

// Update transaction detail
exports.updateTransactionDetail = (req, res) => {
  const {
    transactionDetailId,
    data: { invoiceRefId, amount, remittanceId, paymentDate, type, comments },
  } = req.body

  const data = {
    invoiceRefId,
    amount,
    remittanceId,
    paymentDate,
    type,
    comments,
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

// Delete transaction detail
exports.deleteTransactionDetail = (req, res) => {
  const { transactionDetailId } = req.body

  TransactionDetailModel.findByIdAndRemove(transactionDetailId)
    .then((result) => {
      if (!result) {
        res.status(200).json({ data: null, msg: 'no record found' })
      } else {
        res.status(200).json({ data: null, msg: 'success' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}
