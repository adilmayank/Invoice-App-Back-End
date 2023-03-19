// Function Param (InvoiceId)
// Fetch Invoice from database with quotation and previous payments populated

const { aggregateInvoice } = require('./InvoiceAggregate')
const { InvoiceModel } = require('../Models')

exports.UpdateInvoicePaymentStatus = async (invoiceId) => {
  let paymentStatus
  const invoiceRecord = await InvoiceModel.findById(invoiceId)
    .populate({
      path: 'quotationRefId',
      populate: [{ path: 'products.product' }],
    })
    .populate({
      path: 'previousPayments',
    })
    .lean()

  aggregateInvoice(invoiceRecord)

  if (invoiceRecord.balanceDue === invoiceRecord.grandTotal) {
    paymentStatus = 'unpaid'
  } else if (
    invoiceRecord.balanceDue > 0 &&
    invoiceRecord.balanceDue < invoiceRecord.grandTotal
  ) {
    paymentStatus = 'partiallyPaid'
  }
  if (invoiceRecord.balanceDue <= 0) {
    paymentStatus = 'paid'
  }

  await InvoiceModel.findByIdAndUpdate(invoiceId, { paymentStatus })
}
