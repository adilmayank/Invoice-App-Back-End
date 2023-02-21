require('dotenv').config()
const express = require('express')
const app = express()
const {
  compile,
  pdfCreate,
  compileWithOrders,
  compileWithOrders2,
} = require('./generatePdf')
const cors = require('cors')

const port = process.env.PORT || 5000

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://adil-invoice-app.netlify.app/',
    ],
  })
)

app.use(express.json())
app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  res.send('Please use "/api/v1/" to redirect to home page')
})

app.get('/api/v1/', (req, res) => {
  res.send('Welcome to home page')
})

app.get('/api/v1/front-end-test', (req, res) => {
  res.json({ value: 42, msg: 'Passed' })
})

app.get('/api/v1/compile', (req, res) => {
  const compileResult = compile('template-3')

  pdfCreate(compileResult).then((result) => {
    console.log(`${req.protocol}://${req.get('host')}`)
    if (result) {
      res.send('Pdf Generated')
    } else {
      res.send('Error occured')
    }
  })
})

app.post('/api/v1/generatePdf', (req, res) => {
  const { orders } = req.body

  const compileResult = compileWithOrders(orders, 'template-3')

  pdfCreate(compileResult).then((result) => {
    console.log(`${req.protocol}://${req.get('host')}`)
    if (result) {
      res.send(result)
    } else {
      res.send('Error occured')
    }
  })
})

app.post('/api/v1/generateExcel', (req, res) => {
  const {
    submittedCustomerName: name,
    submittedCustomerABN: abn,
    submittedCustomerEmail: email,
    submittedGstRate: gst,
    submittedProducts: productList,
  } = req.body
  if (productList.length > 0) {
    const compileResult = compileWithOrders2(
      { name, abn, email, gst, productList },
      'template-4'
    )

    pdfCreate(compileResult).then((result) => {
      if (result) {
        res.send(result)
      } else {
        res.send('Error occured')
      }
    })
  } else {
    res.send('Nothing to send')
  }
})

app.get('*', (req, res) => {
  res.send('No route exists')
})

app.listen(port, () => {
  console.log(`Now listening to port ${port}`)
})
