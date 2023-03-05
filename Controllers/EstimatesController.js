exports.getAllEstimates = (req, res) => {
  res.send(`Get All Estimates : Not Implemented`)
}

exports.getSingleEstimate = (req, res) => {
  res.send(`Get Single Estimate : ${req.params.id} : Not Implemented`)
}

exports.updateSingleEstimate = (req, res) => {
  const data = req.body
  const estimateId = req.params.id
  res.send({ estimateId, data })
}

exports.createEstimate = (req, res) => {
  const data = req.body
  res.json({ data: data })
}
