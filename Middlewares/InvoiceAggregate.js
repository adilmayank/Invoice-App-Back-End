// This middle ware is responsible to aggregate the data which is to be sent to the client
// Taxes on individual products, as well as a total tax, sub total amount, grand total, balance due etc are aggregated here
// Some new properties will be added to the response object like previous payments and balance due.

exports.InvoiceAggregate = (req, res) => {
  const {
    locals: { responseData },
  } = res
  res.json({ data: responseData })
}
