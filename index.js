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

const mongoose = require('mongoose')

const {
  CustomersRoutes: customerRoutes,
  ProductsRoutes: productRoutes,
  AccountUserRoutes: accountUserRoutes,
  InvoicesRoutes: invoicesRoutes,
  QuotationsRoutes: quotationRoutes,
} = require('./Routes/index')

const port = process.env.PORT || 5000

mongoose.set('strictQuery', false)
const userName = encodeURIComponent(process.env.MONGODB_USERNAME)
const password = encodeURIComponent(process.env.MONGODB_PASSWORD)
const cluster = process.env.MONGODB_CLUSTER
const dbName = process.env.MONGODB_DB_NAME

const mongoDb = `mongodb+srv://${userName}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://adil-invoice-app.netlify.app'],
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

    pdfCreate(compileResult)
      .then((result) => {
        if (result) {
          res.send(result)
        } else {
          res.send('Error occured')
        }
      })
      .catch((err) => console.log(err))
  } else {
    res.send('Nothing to send')
  }
})

// To handle Customer Routing and Logic
app.use(customerRoutes)

// To handle Product Routing and Logic
app.use(productRoutes)

// To handle Account User Routing and Logic
app.use(accountUserRoutes)

// To handle Invoices Routing and Logic
app.use(invoicesRoutes)

// To handle Estimates Routing and Logic
app.use(quotationRoutes)

app.get('*', (req, res) => {
  res.send('No route exists')
})

async function dbConnect() {
  await mongoose.connect(mongoDb)
}

app.listen(port, async () => {
  try {
    await dbConnect()
    console.log(`Now listening to port ${port}`)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
})
