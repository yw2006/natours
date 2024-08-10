const mongoose = require('mongoose');
const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'tour must have a name'],
    unique: true,
    trim: true
  },
  ratingAverage: {
    type: Number,
    default: 4
  },
  ratingQuantity: {
    type: Number,
    default: 4
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'tour must have a gruop size']
  },
  duration: {
    type: Number,
    required: [true, 'tour must have a duration']
  },
  difficulty: {
    type: String,
    required: [true, 'tour must have a difficulty']
  },
  price: {
    type: Number,
    required: [true, 'tour must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'tour must have a description']
  },
  imageCover: {
    type: String,
    required: [true, 'tour must have a image cover']
  },
  images:[String],
  createdAt:{
    type:Date,
    default:Date.now()
  },
  startDates:[Date]
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports=Tour;