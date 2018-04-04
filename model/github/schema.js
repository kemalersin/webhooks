const mongoose = require('mongoose')
const Schema = mongoose.Schema

const githubSchema = new Schema({
  payload: { type: Object }
})

module.exports = githubSchema
