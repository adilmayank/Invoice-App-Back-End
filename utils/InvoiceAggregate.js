// Returns ->  Void
// Param -> invoiceData from db query(leaned)
exports.InvoiceAggregate = (invoiceData) => {
  const tempQuotationProductData = invoiceData.quotationRefId.products
  const tempQuotationTaxRateData =
    invoiceData.quotationRefId.taxComponents.taxRate
  const invoiceDiscountRate = invoiceData.discountComponent.discountRate
  const invoicePreviousPayments = invoiceData.previousPayments

  // Aggregating Products List
  const aggregatedProductList = tempQuotationProductData.map(
    (productItem, index) => {
      return {
        product: productItem.product,
        quantity: productItem.quantity,
        totalAmount: productItem.quantity * productItem.product.unitPrice,
        _id: productItem._id,
      }
    }
  )
  invoiceData.quotationRefId.products = aggregatedProductList

  // Aggregating Total Amount without taxes
  const subTotal = aggregatedProductList.reduce((intialValue, productItem) => {
    return intialValue + productItem.totalAmount
  }, 0)
  invoiceData.subTotal = subTotal

  // Creating and finding discounted sub total
  const discountedSubtotal = subTotal * (1 - invoiceDiscountRate / 100)
  invoiceData.discountedSubtotal = discountedSubtotal

  // Aggregating Tax Components, per component
  const aggregatedTaxValue = tempQuotationTaxRateData.map(
    (taxRateItem, index) => {
      return (discountedSubtotal * taxRateItem) / 100
    }
  )
  invoiceData.quotationRefId.taxComponents.taxValue = aggregatedTaxValue

  // Aggregating Total Tax Amount
  const totalTaxAmount = aggregatedTaxValue.reduce(
    (intialValue, taxValueItem) => {
      return intialValue + taxValueItem
    },
    0
  )
  invoiceData.totalTaxAmount = totalTaxAmount

  // Aggregating Previous Payments
  let totalPreviousPayments = 0
  if (invoicePreviousPayments.length > 0) {
    totalPreviousPayments = invoicePreviousPayments.reduce(
      (amount, paymentItem) => {
        return amount + paymentItem.amount
      },
      0
    )
  }
  invoiceData.previousPayments = totalPreviousPayments

  // Calculating quotation Grand Total
  invoiceData.grandTotal = totalTaxAmount + discountedSubtotal
  invoiceData.balanceDue =
    totalTaxAmount + discountedSubtotal - totalPreviousPayments
}
