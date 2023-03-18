// This middle ware is responsible to aggregate the data which is to be sent to the client
// Taxes on individual products, as well as a total tax, sub total amount, and grand total, are aggregated here

const { aggregateQuotation } = require('../utils/QuotationAggregate')

exports.QuotationAggregate = (req, res) => {
  const {
    locals: { responseData },
  } = res
  aggregateQuotation(responseData)
  res.json({ data: responseData, msg: 'success' })
}
