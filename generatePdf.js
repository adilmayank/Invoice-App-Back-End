const hbs = require('hbs')
const puppeteer = require('puppeteer')
const fs = require('fs')
const { data, orders } = require('./data')
const { aggregateOrders, aggregateOrders2 } = require('./Helpers')
const { buffer } = require('buffer')

function compile(templateName) {
  const templatePath = `${__dirname}/templates/${templateName}.hbs`
  const file = fs.readFileSync(templatePath, 'utf-8')

  const inputData = aggregateOrders(orders)
  if (!file) {
    throw new Error('No file found')
  }

  const compiledResult = hbs.handlebars.compile(file)(inputData)

  return compiledResult
}

function compileWithOrders(inputOrders, templateName) {
  const templatePath = `${__dirname}/templates/${templateName}.hbs`
  const file = fs.readFileSync(templatePath, 'utf-8')

  const inputData = aggregateOrders(inputOrders)
  if (!file) {
    throw new Error('No file found')
  }

  const compiledResult = hbs.handlebars.compile(file)(inputData)

  return compiledResult
}

function compileWithOrders2 (dataFromFrontEnd, templateName) {
  const templatePath = `${__dirname}/templates/${templateName}.hbs`
  const file = fs.readFileSync(templatePath, 'utf-8')

  const inputData = aggregateOrders2(dataFromFrontEnd)
  if (!file) {
    throw new Error('No file found')
  }

  const compiledResult = hbs.handlebars.compile(file)(inputData)

  return compiledResult
}

async function pdfCreate(template) {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.setContent(template, {
    waitUntil: 'domcontentloaded',
  })

  fs.readFile(`${__dirname}/my-invoice.pdf`, (err) => {
    if (err) {
      console.log('No file found to delete')
    } else {
      fs.unlink(`${__dirname}/my-invoice.pdf`, (err) => {})
    }
  })

  let height = await page.evaluate(() => document.documentElement.offsetHeight)
  const pdf = await page.pdf({
    format: 'A4',
    displayHeaderFooter: false,
    printBackground: true,
    height: '10000px',
    path: `${__dirname}/my-invoice.pdf`,
  })
  await browser.close()
  const buff = Buffer.from(pdf.buffer)
  return buff
}

module.exports = { compile, pdfCreate, compileWithOrders, compileWithOrders2 }
