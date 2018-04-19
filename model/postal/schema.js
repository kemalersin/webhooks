const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postalSchema = new Schema({
  payload: { type: Object }
})

module.exports = postalSchema
