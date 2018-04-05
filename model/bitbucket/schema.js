const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bitbucketSchema = new Schema({
  payload: { type: Object }
})

module.exports = bitbucketSchema
