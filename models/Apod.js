const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApodSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }]
})

const Apod = mongoose.model('Apod', ApodSchema)

module.exports = Apod
