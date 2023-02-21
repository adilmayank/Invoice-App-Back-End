const fs = require('fs')

const image = fs
  .readFileSync(`${process.cwd()}/public/images/signature.png`)
  .toString('base64')

const data = {
  name: 'Adil',
  image,
}

const orders = [
  {
    sno: 1,
    code: '600FB100EA',
    desc: 'Fixed Bar',
    unitPrice: 9.6,
    qty: 1,
  },
  {
    sno: 2,
    code: '900AB100EA6',
    desc: 'Angle Bar',
    unitPrice: 24.03,
    qty: 3,
  },
  {
    sno: 3,
    code: '1200AB100EA',
    desc: 'Angle Bar',
    unitPrice: 32.04,
    qty: 6,
  },
  {
    sno: 4,
    code: '1800AB100EA6',
    desc: 'Angle Bar',
    unitPrice: 48.06,
    qty: 5,
  },
  {
    sno: 5,
    code: '5200TB200EA10',
    desc: 'T Bar',
    unitPrice: 696.8,
    qty: 1,
  },
  // {
  //   sno: 6,
  //   code: '2400AB100EA8',
  //   desc: 'Angle Bar',
  //   unitPrice: 100,
  //   qty: 2,
  // },
  // {
  //   sno: 7,
  //   code: '3600AB100EA10',
  //   desc: 'Angle Bar',
  //   unitPrice: 150,
  //   qty: 1,
  // },
  // {
  //   sno: 8,
  //   code: '5200TB200*10*250*10_520',
  //   desc: 'T Bar',
  //   unitPrice: 205,
  //   qty: 1,
  // },
]

module.exports = { data, orders }
