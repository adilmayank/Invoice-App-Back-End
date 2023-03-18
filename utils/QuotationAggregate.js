// Returns ->  Void
// Param -> quotationData from db query(leaned)
exports.aggregateQuotation = (quotationData) => {
  const tempQuotationProductData = quotationData.products
  const tempQuotationTaxRateData = quotationData.taxComponents.taxRate

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
  quotationData.products = aggregatedProductList

  // Aggregating Total Amount without taxes
  const subTotal = aggregatedProductList.reduce((intialValue, productItem) => {
    return intialValue + productItem.totalAmount
  }, 0)
  quotationData.subTotal = subTotal

  // Aggregating Tax Components, per component
  const aggregatedTaxValue = tempQuotationTaxRateData.map(
    (taxRateItem, index) => {
      return (subTotal * taxRateItem) / 100
    }
  )
  quotationData.taxComponents.taxValue = aggregatedTaxValue

  // Aggregating Total Tax Amount
  const totalTaxAmount = aggregatedTaxValue.reduce(
    (intialValue, taxValueItem) => {
      return intialValue + taxValueItem
    },
    0
  )
  quotationData.totalTaxAmount = totalTaxAmount

  // Calculating quotation Grand Total
  quotationData.grandTotal = totalTaxAmount + subTotal
}
