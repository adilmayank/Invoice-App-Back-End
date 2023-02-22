const fs = require('fs')

function aggregateOrders(orders) {
  const logo = fs
    .readFileSync(`${process.cwd()}/public/images/logo-1.png`)
    .toString('base64')
  const phone = fs
    .readFileSync(`${process.cwd()}/public/images/phone.png`)
    .toString('base64')
  const map = fs
    .readFileSync(`${process.cwd()}/public/images/map.png`)
    .toString('base64')
  const email = fs
    .readFileSync(`${process.cwd()}/public/images/mail.png`)
    .toString('base64')

  const updatedOrders = orders.map((item) => {
    item['totalPrice'] = item.qty * item.unitPrice
    return item
  })

  const collective = updatedOrders.reduce(
    (total, current) => {
      total.totalQuantity += current.qty
      total.totalAmount += current.totalPrice

      return total
    },
    {
      totalQuantity: 0,
      totalAmount: 0,
    }
  )

  const dateString = new Date().toDateString('dd/MM/yyyy')
  const gst = 18
  const grandTotalWithGst = (collective.totalAmount * (1 + gst / 100)).toFixed(
    2
  )

  const data = {
    owner: 'Grace Windows and Doors PTY LTD',
    customer: 'Siddhu Homes',
    date: dateString,
    orders: updatedOrders,
    totalQty: collective.totalQuantity,
    grandTotal: collective.totalAmount,
    grandTotalWithGst: grandTotalWithGst,
    gst,
    logo,
    phone,
    email,
    map,
  }
  return data
}

function aggregateOrders2(dataFromFrontEnd) {
  const logo = fs
    .readFileSync(`${process.cwd()}/public/images/logo-1.png`)
    .toString('base64')
  const phoneLogo = fs
    .readFileSync(`${process.cwd()}/public/images/phone.png`)
    .toString('base64')
  const mapLogo = fs
    .readFileSync(`${process.cwd()}/public/images/map.png`)
    .toString('base64')
  const emailLogo = fs
    .readFileSync(`${process.cwd()}/public/images/mail.png`)
    .toString('base64')

  const { name, email, abn, productList, gst } = dataFromFrontEnd

  const updatedOrders = productList.map((item) => {
    item['subTotal'] = parseFloat((item.quantity * item.unitPrice).toFixed(2))
    return item
  })

  const collective = updatedOrders.reduce(
    (total, current) => {
      total.totalQuantity += current.quantity
      total.totalAmount += current.subTotal

      return total
    },
    {
      totalQuantity: 0,
      totalAmount: 0,
    }
  )

  const date = new Date().toDateString('dd/MM/yyyy')
  const grandTotal = collective.totalAmount
  const gstTotal = (grandTotal * gst) / 100
  const grandTotalWithGst = grandTotal + gstTotal

  const data = {
    owner: 'Grace Windows and Doors PTY LTD',
    customer: name,
    abn,
    email,
    date,
    orders: updatedOrders,
    totalQty: collective.totalQuantity,
    grandTotal: grandTotal.toFixed(2),
    grandTotalWithGst: grandTotalWithGst.toFixed(2),
    gstTotal: gstTotal.toFixed(2),
    logo,
    phoneLogo,
    emailLogo,
    mapLogo,
  }
  return data
}

module.exports = { aggregateOrders, aggregateOrders2 }
